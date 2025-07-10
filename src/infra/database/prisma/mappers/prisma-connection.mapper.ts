import { Prisma, Connection as PrismaConnection } from '@prisma/client'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { WhatsappNumber } from '@/core/value-objects/whatsapp-number.value-object'
import { Connection } from '@/domain/connection/entities/connection.entity'
import { InstanceName } from '@/domain/connection/value-objects/instance-name.value-object'

export class PrismaConnectionMapper {
	static toDomain(raw: PrismaConnection): Connection {
		return Connection.create(
			{
				agentId: new UniqueEntityID(raw.agentId),
				name: InstanceName.create(raw.name),
				token: new UniqueEntityID(raw.token),
				whatsappNumber: WhatsappNumber.create(raw.number),
				status: raw.status,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toPrisma(connection: Connection): Prisma.ConnectionUncheckedCreateInput {
		return {
			id: connection.id.toString(),
			agentId: connection.agentId.toString(),
			name: connection.name.value,
			number: connection.whatsappNumber.whatsappId,
			token: connection.token.toString(),
			status: connection.status,
			createdAt: connection.createdAt,
			updatedAt: connection.updatedAt,
		}
	}
}
