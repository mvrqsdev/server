import { Injectable } from '@nestjs/common'
import { Prisma, Instance as PrismaInstance } from '@prisma/client'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { WhatsappNumber } from '@/core/value-objects/whatsapp-number.value-object'
import { Instance, InstanceConnection } from '@/domain/instance/entities/instance.entity'
import { WhatsAppAuthCreds } from '@/domain/instance/value-objects/whatsapp-auth-creds.value-object'

@Injectable()
export class PrismaInstanceMapper {
	toDomain(raw: PrismaInstance): Instance {
		return Instance.create(
			{
				name: raw.name,
				connection: raw.connection as InstanceConnection,
				ownerJid: raw.ownerJid ? WhatsappNumber.create(raw.ownerJid) : null,
				profileName: raw.profileName,
				profilePicUrl: raw.profilePicUrl,
				number: raw.number ? WhatsappNumber.create(raw.number) : null,
				clientName: raw.clientName,
				disconnectionAt: raw.disconnectionAt,
				agentId: new UniqueEntityID(raw.agentId),
				session: raw.session ? WhatsAppAuthCreds.fromJSON(raw.session) : null,
				lastQrCode: raw.lastQrCode ?? null,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}

	toPrisma(instance: Instance): Prisma.InstanceUncheckedCreateInput {
		return {
			id: instance.id.toString(),
			name: instance.name,
			connection: instance.connection,
			ownerJid: instance.ownerJid?.number ?? null,
			profileName: instance.profileName ?? null,
			profilePicUrl: instance.profilePicUrl ?? null,
			number: instance.number?.number ?? null,
			clientName: instance.clientName ?? null,
			disconnectionAt: instance.disconnectionAt ?? null,
			agentId: instance.agentId.toString(),
			session: instance.session ? instance.session.toJSON() : null,
			lastQrCode: instance.lastQrCode ?? null,
			createdAt: instance.createdAt,
			updatedAt: instance.updatedAt,
		}
	}
}
