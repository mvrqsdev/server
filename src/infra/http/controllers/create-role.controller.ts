import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { z } from 'zod'
import { CreateRoleUseCase } from '@/domain/roles/application/use-cases/create-role.use-case'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const createRoleBodySchema = z.object({
	name: z.string(),
	description: z.string(),
	color: z.string(),
	permissionsIds: z.array(z.string().uuid()),
})

type CreateRoleBodySchema = z.infer<typeof createRoleBodySchema>

@Controller('/roles')
export class CreateRoleController {
	constructor(private createRole: CreateRoleUseCase) {}

	@Post()
	@ApiOperation({
		operationId: 'createRole',
		summary: 'Create Role',
		description: 'Create a role in the system.',
		tags: ['Roles'],
	})
	@UsePipes(new ZodValidationPipe(createRoleBodySchema))
	@HttpCode(201)
	async handle(@Body() body: CreateRoleBodySchema) {
		const { name, description, color, permissionsIds } = body

		const result = await this.createRole.execute({
			name,
			description,
			color,
			permissionsIds,
		})

		if (result.isLeft()) {
			throw new BadRequestException()
		}
	}
}
