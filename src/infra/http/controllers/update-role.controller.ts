import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Param,
	Put,
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { z } from 'zod'
import { UpdateRoleUseCase } from '@/domain/roles/application/use-cases/update-role.use-case'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const updateRoleBodySchema = z.object({
	name: z.string(),
	description: z.string(),
	color: z.string(),
	permissionsIds: z.array(z.string().uuid()),
})

type UpdateRoleBodySchema = z.infer<typeof updateRoleBodySchema>

const bodyValidationPipe = new ZodValidationPipe(updateRoleBodySchema)

@Controller('/roles/:id')
export class UpdateRoleController {
	constructor(private updateRole: UpdateRoleUseCase) {}

	@Put()
	@ApiOperation({
		operationId: 'updateRole',
		summary: 'Update Role',
		description: 'Update a role in the system.',
		tags: ['Roles'],
	})
	@HttpCode(204)
	async handle(
		@Body(bodyValidationPipe) body: UpdateRoleBodySchema,
		@Param('id') id: string,
	) {
		const { name, description, color, permissionsIds } = body
		const result = await this.updateRole.execute({
			roleId: id,
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
