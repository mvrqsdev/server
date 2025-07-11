import { Prisma, Lead as PrismaLead } from '@prisma/client'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Lead } from '@/domain/lead/entities/lead.entity'
import { LeadStateFactory } from '@/domain/lead/factories/lead-state-factory'

export class PrismaLeadMapper {
	static toDomain(raw: PrismaLead): Lead {
		return Lead.create(
			{
				agentId: new UniqueEntityID(raw.agentId),
				contactId: new UniqueEntityID(raw.contactId),
				converted: raw.converted,
				status: LeadStateFactory.create(raw.status),
				value: raw.value,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toPrisma(lead: Lead): Prisma.LeadUncheckedCreateInput {
		return {
			id: lead.id.toString(),
			agentId: lead.agentId.toString(),
			contactId: lead.contactId.toString(),
			converted: lead.converted,
			status: lead.status.state,
			value: lead.value,
			createdAt: lead.createdAt,
			updatedAt: lead.updatedAt,
		}
	}
}
