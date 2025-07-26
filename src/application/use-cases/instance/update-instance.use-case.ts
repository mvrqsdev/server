import { Injectable } from '@nestjs/common'
import { InstanceUpdate } from '@/application/facades/instance/interface'
import { InstanceRepository } from '@/application/repositories/instance.repository'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { WhatsappNumber } from '@/core/value-objects/whatsapp-number.value-object'
import { Instance } from '@/domain/instance/entities/instance.entity'
import { WhatsAppAuthCreds } from '@/domain/instance/value-objects/whatsapp-auth-creds.value-object'

export type InstanceUpdateRequest = InstanceUpdate & { instance: Instance }
interface UpdateInstanceUseCaseResponse {
	instance: Instance
}

@Injectable()
export class UpdateInstanceUseCase
	implements BaseUseCase<InstanceUpdateRequest, UpdateInstanceUseCaseResponse>
{
	constructor(private instanceRepository: InstanceRepository) {}
	async execute({
		instance,
		agentId,
		clientName,
		connection,
		disconnectionAt,
		lastQrCode,
		name,
		number,
		ownerJid,
		profileName,
		profilePicUrl,
		session,
	}: InstanceUpdateRequest): Promise<UpdateInstanceUseCaseResponse> {
		if (agentId) {
			instance.agentId = new UniqueEntityID(agentId)
		}

		if (typeof clientName !== 'undefined') {
			instance.clientName = clientName
		}

		if (connection) {
			instance.connection = connection
		}

		if (disconnectionAt) {
			instance.disconnectAt()
		}

		if (typeof lastQrCode !== 'undefined') {
			instance.lastQrCode = lastQrCode
		}

		if (name) {
			instance.name = name
		}

		if (number) {
			instance.number = WhatsappNumber.create(number)
		}

		if (ownerJid) {
			instance.ownerJid = WhatsappNumber.create(ownerJid)
		}

		if (typeof profileName !== 'undefined') {
			instance.profileName = profileName
		}

		if (typeof profilePicUrl !== 'undefined') {
			instance.profilePicUrl = profilePicUrl
		}

		if (typeof session !== 'undefined') {
			instance.session = WhatsAppAuthCreds.fromJSON(session)
		}

		await this.instanceRepository.save(instance)

		return {
			instance,
		}
	}
}
