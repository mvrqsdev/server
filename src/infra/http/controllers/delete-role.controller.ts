import { BadRequestException, Controller, Delete, HttpCode, Param } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { DeleteRoleUseCase } from '@/domain/roles/application/use-cases/delete-role.use-case'

@Controller('/roles/:id')
export class DeleteRoleController {
	constructor(private deleteRole: DeleteRoleUseCase) {}

	@Delete()
	@ApiOperation({
		operationId: 'deleteRole',
		summary: 'Delete Role',
		description: 'Delete a role in the system.',
		tags: ['Roles'],
	})
	@HttpCode(204)
	async handle(@Param('id') id: string) {
		const result = await this.deleteRole.execute({ roleId: id })

		if (result.isLeft()) {
			throw new BadRequestException()
		}
	}
}
