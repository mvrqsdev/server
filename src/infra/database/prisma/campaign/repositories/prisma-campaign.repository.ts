import { Injectable } from '@nestjs/common'
import { CampaignRepository } from '@/application/repositories/campaign.repository'
import { Campaign } from '@/domain/campaign/entities/campaign.entity'
import { PrismaService } from '../../prisma.service'
import { PrismaCampaignMapper } from '../mappers/campaign.prisma-mapper'

@Injectable()
export class PrismaCampaignRepository implements CampaignRepository {
	constructor(private prisma: PrismaService) {}

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
