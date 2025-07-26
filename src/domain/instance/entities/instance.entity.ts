import { AggregateRoot } from '@/core/entities/aggregate-root'
import { clock } from '@/core/helpers/dayjs'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { WhatsappNumber } from '@/core/value-objects/whatsapp-number.value-object'
import { CloseConnectionInstanceEvent } from '../events/close-connection-instance.event'
import { StartConnectingInstanceEvent } from '../events/start-connecting-instance.event'
import { WhatsAppAuthCreds } from '../value-objects/whatsapp-auth-creds.value-object'

export type InstanceConnection = 'open' | 'connecting' | 'close'
export interface InstanceProps {
	name: string
	connection: InstanceConnection
	ownerJid?: WhatsappNumber | null
	profileName?: string | null
	profilePicUrl?: string | null
	number?: WhatsappNumber | null
	clientName?: string | null
	disconnectionAt?: Date | null
	agentId: UniqueEntityID
	session?: WhatsAppAuthCreds | null
	lastQrCode?: string | null
	createdAt: Date
	updatedAt?: Date | null
}

export class Instance extends AggregateRoot<InstanceProps> {
	get name() {
		return this.props.name
	}

	set name(name: string) {
		this.props.name = name
		this.touch()
	}

	get connection() {
		return this.props.connection
	}

	set connection(connection: 'open' | 'connecting' | 'close') {
		const oldProps = this.props.connection
		this.props.connection = connection
		if (oldProps !== connection) {
			if (connection === 'close') {
				this.addDomainEvent(new CloseConnectionInstanceEvent(this))
			}

			if (connection === 'connecting') {
				this.addDomainEvent(new StartConnectingInstanceEvent(this))
			}
		}
		this.touch()
	}

	get ownerJid() {
		return this.props.ownerJid ?? null
	}

	set ownerJid(ownerJid: WhatsappNumber | null) {
		this.props.ownerJid = ownerJid
		this.touch()
	}

	get profileName() {
		return this.props.profileName ?? null
	}

	set profileName(name: string | null) {
		this.props.profileName = name
		this.touch()
	}

	get profilePicUrl() {
		return this.props.profilePicUrl ?? null
	}

	set profilePicUrl(url: string | null) {
		this.props.profilePicUrl = url
		this.touch()
	}

	get number() {
		return this.props.number ?? null
	}

	set number(number: WhatsappNumber | null) {
		this.props.number = number
		this.touch()
	}

	get clientName() {
		return this.props.clientName ?? null
	}

	set clientName(clientName: string | null) {
		this.props.clientName = clientName
		this.touch()
	}

	get disconnectionAt() {
		return this.props.disconnectionAt ?? null
	}

	public disconnectAt() {
		this.props.disconnectionAt = clock().toDate()
		this.touch()
	}

	get agentId() {
		return this.props.agentId
	}

	get session() {
		return this.props.session ?? null
	}

	set session(session: WhatsAppAuthCreds | null) {
		this.props.session = session
		this.touch()
	}

	get lastQrCode() {
		return this.props.lastQrCode ?? null
	}

	set lastQrCode(qrcode: string | null) {
		this.props.lastQrCode = qrcode
		this.touch()
	}

	set agentId(agentId: UniqueEntityID) {
		this.props.agentId = agentId
	}

	get createdAt() {
		return this.props.createdAt
	}

	get updatedAt() {
		return this.props.updatedAt
	}

	private touch() {
		this.props.updatedAt = clock().toDate()
	}

	static create(
		props: Optional<
			InstanceProps,
			| 'connection'
			| 'ownerJid'
			| 'profileName'
			| 'profilePicUrl'
			| 'number'
			| 'clientName'
			| 'disconnectionAt'
			| 'session'
			| 'lastQrCode'
			| 'createdAt'
		>,
		id?: UniqueEntityID,
	) {
		const instance = new Instance(
			{
				...props,
				connection: props.connection ?? 'close',
				ownerJid: props.ownerJid ?? null,
				profileName: props.profileName ?? null,
				profilePicUrl: props.profilePicUrl ?? null,
				number: props.number ?? null,
				clientName: props.clientName ?? null,
				disconnectionAt: props.disconnectionAt ?? null,
				lastQrCode: props.lastQrCode ?? null,
				session: props.session ?? null,
				createdAt: props.createdAt ?? clock().toDate(),
			},
			id,
		)

		return instance
	}
}
