import { release } from 'node:os'
import { Injectable } from '@nestjs/common'
import makeWASocket, {
	AuthenticationCreds,
	initAuthCreds,
	isJidBroadcast,
	isJidGroup,
	isJidNewsletter,
	SignalDataTypeMap,
	SignalKeyStore,
	UserFacingSocketConfig,
	WABrowserDescription,
	WASocket,
} from '@whiskeysockets/baileys'
import pino from 'pino'
import { InstanceFacade } from '@/application/facades/instance/instance.facade'
import { Instance } from '@/domain/instance/entities/instance.entity'
import { WhatsAppAuthCreds } from '@/domain/instance/value-objects/whatsapp-auth-creds.value-object'
import { ChannelInstance } from './channel-instance'

type SignalKey = keyof SignalDataTypeMap

@Injectable()
export class ChannelStartupService {
	constructor(private instanceFacade: InstanceFacade) {}

	async createChannel(instance: Instance): Promise<ChannelInstance> {
		const createSocket = () => this.createSocket(instance)
		const channel = new ChannelInstance(instance, createSocket, this.instanceFacade)
		return channel
	}

	private async createSocket(
		instance: Instance,
	): Promise<{ client: WASocket; saveCreds: () => Promise<void> }> {
		const { saveCreds, state } = await this.getAuthState(instance)
		const browser: WABrowserDescription = ['Orbita API', 'Chrome', release()]
		const socketConfig: UserFacingSocketConfig = {
			browser,
			logger: pino({
				level: 'silent',
			}),
			printQRInTerminal: false,
			generateHighQualityLinkPreview: true,
			markOnlineOnConnect: false,
			retryRequestDelayMs: 350,
			maxMsgRetryCount: 4,
			fireInitQueries: true,
			connectTimeoutMs: 30_000,
			keepAliveIntervalMs: 30_000,
			auth: state,
			qrTimeout: 45_000,
			emitOwnEvents: false,
			shouldIgnoreJid: (jid) => {
				const isGroupJid = isJidGroup(jid)
				const isBroadcast = isJidBroadcast(jid)
				const isNewsletter = isJidNewsletter(jid)
				return isGroupJid || isBroadcast || isNewsletter
			},
			syncFullHistory: false,
			transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 3000 },
		}

		const client = makeWASocket(socketConfig)
		return {
			client,
			saveCreds,
		}
	}

	private async getAuthState(instace: Instance): Promise<{
		state: { creds: AuthenticationCreds; keys: SignalKeyStore }
		saveCreds: () => Promise<void>
	}> {
		const creds = instace.session?.value ?? initAuthCreds()

		const keys = new Map<string, any>()

		const keyStore = {
			async get(type: SignalKey, ids: string[]) {
				return Object.fromEntries(ids.map((id) => [id, keys.get(`${type}:${id}`)]))
			},
			async set(data: Partial<{ [T in SignalKey]: { [id: string]: any } }>) {
				for (const _type in data) {
					const type = _type as SignalKey
					for (const id in data[type]!) {
						const value = data[type]![id]
						keys.set(`${type}:${id}`, value)
					}
				}
			},
			async delete(data: Partial<{ [T in SignalKey]: string[] }>) {
				for (const _type in data) {
					const type = _type as SignalKey
					for (const id of data[type]!) {
						keys.delete(`${type}:${id}`)
					}
				}
			},
		} as SignalKeyStore

		return {
			state: {
				creds,
				keys: keyStore,
			},
			saveCreds: async () => {
				if (!creds.me?.id) return

				instace.session = WhatsAppAuthCreds.create(creds)

				await this.instanceFacade.update(
					'id',
					{ instanceId: instace.id.toString() },
					{ session: creds },
				)
			},
		}
	}
}
