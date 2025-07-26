/** biome-ignore-all lint/suspicious/noConsole: Necessary */
/** biome-ignore-all lint/style/noNonNullAssertion: Necessary */
/** biome-ignore-all lint/suspicious/noExplicitAny: necessary */
import { Boom } from '@hapi/boom'
import { ConnectionState, DisconnectReason, WASocket } from '@whiskeysockets/baileys'
import * as qrcode from 'qrcode'
import * as qrcodeTerminal from 'qrcode-terminal'
import { InstanceFacade } from '@/application/facades/instance/instance.facade'
import { Instance } from '@/domain/instance/entities/instance.entity'

export class ChannelInstance {
	public client: WASocket
	private isConnecting = false
	private saveCreds: () => Promise<void>
	constructor(
		public instance: Instance,
		private readonly createSocket: () => Promise<{
			client: WASocket
			saveCreds: () => Promise<void>
		}>,
		private instanceFacade: InstanceFacade,
	) {}

	async connectToWhatsapp() {
		if (this.isConnecting) return
		const { client, saveCreds } = await this.createSocket()
		this.client = client
		this.saveCreds = saveCreds
		this.isConnecting = false
		this.eventHandler()
	}

	async disconnectToWhatsapp() {
		if (this.client.ws.isOpen) {
			await this.client.logout()
			await this.client.ws.close()
			await this.client.end(undefined)
		}
	}

	private async reconnect() {
		const { client, saveCreds } = await this.createSocket()
		this.client = client
		this.saveCreds = saveCreds
		this.eventHandler()
	}

	private eventHandler() {
		this.client.ev.process(async (events) => {
			if (events.call) {
				// const call = events.call[0]
				// this.client.rejectCall(call.id, call.from)
			}

			if (events['connection.update']) {
				this.connectionUpdate(events['connection.update'])
			}

			if (events['creds.update']) {
				this.saveCreds()
			}

			if (events['messages.upsert']) {
			}
		})
	}

	private async connectionUpdate({
		qr,
		connection,
		lastDisconnect,
	}: Partial<ConnectionState>) {
		if (qr) {
			const optsQrcode: qrcode.QRCodeToDataURLOptions = {
				type: 'image/png',
				margin: 3,
				scale: 4,
				errorCorrectionLevel: 'H',
				color: { light: '#ffffff', dark: '#8400ff' },
			}
			try {
				const base64 = await qrcode.toDataURL(qr, optsQrcode)
				const { instance } = await this.instanceFacade.update(
					'id',
					{ instanceId: this.instance.id.toString() },
					{ lastQrCode: base64 },
				)
				this.instance = instance
			} catch (error) {
				console.error('Erro ao gerar base64 do QR Code:', error)
			}

			// qrcodeTerminal.generate(qr, { small: true }, (qrcodeStr) => console.log(qrcodeStr))
		}

		if (connection === 'close') {
			const statusCode = (lastDisconnect?.error as Boom)?.output?.statusCode
			const codesToNotReconect = [
				DisconnectReason.loggedOut,
				DisconnectReason.forbidden,
				402,
				406,
			]
			const shouldReconnect = !codesToNotReconect.includes(statusCode)

			if (shouldReconnect) {
				await this.reconnect()
			}

			if (!shouldReconnect) {
				const { instance } = await this.instanceFacade.update(
					'id',
					{ instanceId: this.instance.id.toString() },
					{ connection, lastQrCode: null, session: null },
				)
				this.instance = instance
			}
		}

		if (connection === 'open') {
			await this.saveCreds()
			const { instance } = await this.instanceFacade.update(
				'id',
				{ instanceId: this.instance.id.toString() },
				{ connection },
			)
			this.instance = instance
		}

		if (connection === 'connecting') {
		}
	}
}
