import { Injectable } from '@nestjs/common'
import { Prisma, Connection as PrismaConnection } from '@prisma/client'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { WhatsappNumber } from '@/core/value-objects/whatsapp-number.value-object'
import { Connection } from '@/domain/connection/entities/connection.entity'
import { ConnectionStatusFactory } from '@/domain/connection/factories/connection-status.factory'
import { ConnectionToken } from '@/domain/connection/value-objects/connection-token.value-object'
import { InstanceName } from '@/domain/connection/value-objects/instance-name.value-object'
import { InstanceId } from '@/domain/connection/value-objects/instanceId.value-object'

@Injectable()
export class PrismaConnectionMapper {
	constructor(private connectionStatusFactory: ConnectionStatusFactory) {}
	toDomain(raw: PrismaConnection): Connection {
		return Connection.create(
			{
				agentId: new UniqueEntityID(raw.id),
				instanceId: new InstanceId(raw.instanceId),
				name: new InstanceName(raw.name),
				number: WhatsappNumber.create(raw.number),
				token: new ConnectionToken(raw.token),
				status: this.connectionStatusFactory.create(raw.status),
				principal: raw.principal,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}

	toPrisma(connection: Connection): Prisma.ConnectionUncheckedCreateInput {
		return {
			id: connection.id.toString(),
			agentId: connection.agentId.toString(),
			name: connection.name.toString(),
			instanceId: connection.instanceId.toString(),
			status: connection.status.getName(),
			number: connection.number.number,
			principal: connection.principal,
			token: connection.token.toString(),
			createdAt: connection.createdAt,
			updatedAt: connection.updatedAt,
		}
	}
}
