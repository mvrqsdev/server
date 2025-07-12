import { Injectable } from '@nestjs/common'
import { CampaignRepository } from '@/application/repositories/campaign/campaign.repository'
import { Campaign } from '@/domain/campaign/entities/campaign.entity'
import { PrismaCampaignMapper } from '../mappers/prisma-campaign.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaCampaignRepository implements CampaignRepository {
	constructor(private prisma: PrismaService) {}
	async findById(id: string): Promise<Campaign | null> {
		const campaign = await this.prisma.campaign.findUnique({
			where: {
				id,
			},
		})

		if (!campaign) {
			return null
		}

		return PrismaCampaignMapper.toDomain(campaign)
	}
	async findByExternalId(externalId: string): Promise<Campaign | null> {
		const campaign = await this.prisma.campaign.findUnique({
			where: {
				externalId,
			},
		})

		if (!campaign) {
			return null
		}
		return PrismaCampaignMapper.toDomain(campaign)
	}

	async create(campaign: Campaign): Promise<void> {
		const data = PrismaCampaignMapper.toPrisma(campaign)
		await this.prisma.campaign.create({ data })
	}

	async save(campaign: Campaign): Promise<void> {
		const data = PrismaCampaignMapper.toPrisma(campaign)
		await this.prisma.campaign.update({
			where: {
				id: data.id,
			},
			data,
		})
	}
}
