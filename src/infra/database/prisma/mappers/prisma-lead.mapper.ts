import { Prisma, Lead as PrismaLead } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Lead } from '@/domain/real-state/enterprise/entities/lead.entity'

export class PrismaLeadMapper {
	static toDomain(raw: PrismaLead): Lead {
		return Lead.create(
			{
				agentId: new UniqueEntityID(raw.agentId),
				contactId: new UniqueEntityID(raw.contactId),
				converted: raw.converted,
				status: raw.status,
				value: raw.value,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toPrisma(lead: Lead): Prisma.LeadUncheckedCreateInput {
		return {
			agentId: lead.agentId.toString(),
			contactId: lead.contactId.toString(),
			converted: lead.converted,
			status: lead.status,
			value: lead.value,
			createdAt: lead.createdAt,
			updatedAt: lead.updatedAt,
		}
	}
}
