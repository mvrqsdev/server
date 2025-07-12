import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { createZodDto, UseZodGuard } from 'nestjs-zod'
import { z } from 'zod'
import { CreateCampaignUseCase } from '@/application/use-cases/campaign/create-campaign.use-case'
import { CampaignAlreadyExistsError } from '@/application/use-cases/campaign/errors/campaign-already-exists.error'
import { Roles } from '@/infra/authorization/roles.decorator'

const createCampaignBodySchema = z.object({
	name: z.string(),
	externalId: z.string(),
})

type CreateCampaignBodySchema = z.infer<typeof createCampaignBodySchema>

export class CreateCampaignDTO extends createZodDto(createCampaignBodySchema) {}

@Controller('/campaigns')
@ApiTags('Campaigns')
export class CreateCampaignController {
	constructor(private createCampaign: CreateCampaignUseCase) {}

	@Post()
	@UseZodGuard('body', createCampaignBodySchema)
	@Roles('Admin', 'Marketing')
	@HttpCode(201)
	async handle(@Body() body: CreateCampaignBodySchema) {
		const { name, externalId } = body

		const result = await this.createCampaign.execute({ name, externalId })

		if (result.isLeft()) {
			const error = result.value

			switch (error.constructor) {
				case CampaignAlreadyExistsError:
					throw new ConflictException(error.message)
				default:
					throw new BadRequestException(error.message)
			}
		}
	}
}
