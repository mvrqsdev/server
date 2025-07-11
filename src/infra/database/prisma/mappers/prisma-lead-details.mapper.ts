import {
	User as PrismaAgent,
	Contact as PrismaContact,
	Lead as PrismaLead,
	Scheduling as PrismaScheduling,
} from '@prisma/client'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { LeadStateFactory } from '@/domain/lead/factories/lead-state-factory'
import { LeadDetails } from '@/domain/lead/value-objects/lead-datails.value-object'
import { PrismaAgentMapper } from './prisma-agent.mapper'
import { PrismaContactMapper } from './prisma-contact.mapper'
import { PrismaSchedulingMapper } from './prisma-scheduling.mapper'

type PrismaLeadDetails = PrismaLead & {
	Agent: PrismaAgent
	Contact: PrismaContact
	Schedulings: PrismaScheduling[]
}

export class PrismaLeadDetailsMapper {
	static toDomain(raw: PrismaLeadDetails): LeadDetails {
		return LeadDetails.create({
			leadId: new UniqueEntityID(raw.id),
			contactId: new UniqueEntityID(raw.contactId),
			contact: PrismaContactMapper.toDomain(raw.Contact),
			agentId: new UniqueEntityID(raw.agentId),
			agent: PrismaAgentMapper.toDomain(raw.Agent),
			schedulings: raw.Schedulings.map(PrismaSchedulingMapper.toDomain),
			converted: raw.converted,
			value: raw.value,
			status: LeadStateFactory.create(raw.status),
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
		})
	}
}
