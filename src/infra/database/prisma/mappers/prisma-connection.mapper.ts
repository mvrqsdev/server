import { Prisma, Connection as PrismaConnection } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Connection } from '@/domain/real-state/enterprise/entities/connection.entity'
import { InstanceName } from '@/domain/real-state/enterprise/entities/value-objects/instance-name.value-object'
import { WhatsappNumber } from '@/domain/real-state/enterprise/entities/value-objects/whatsapp-number.value-object'

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
