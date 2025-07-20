import { Injectable } from '@nestjs/common'
import { GetManyRoleStrategy } from '@/application/facades/roles/contract/get-many-role-strategy'
import { GetRoleStrategy } from '@/application/facades/roles/contract/get-role-strategy'
import { RoleCreate, RoleDelete, RoleUpdate } from '@/application/facades/roles/interface'
import { RoleFacade } from '@/application/facades/roles/role.facade'
import { CheckIfRoleDoesNotExistsUseCase } from '@/application/use-cases/role/check-if-role-does-not-exists.use-case'
import { CreateRoleUseCase } from '@/application/use-cases/role/create-role.use-case'
import { UpdateRoleUseCase } from '@/application/use-cases/role/update-role.use-case'
import { Role } from '@/domain/role/entities/role.entity'

@Injectable()
export class NestRoleFacade implements RoleFacade {
	constructor(
		private checkIfRoleDoesNotExistsUseCase: CheckIfRoleDoesNotExistsUseCase,
		private createRoleUseCase: CreateRoleUseCase,
		private updateRoleUseCase: UpdateRoleUseCase,
	) {}
	async create(params: RoleCreate): Promise<{ role: Role }> {
		await this.checkIfRoleDoesNotExistsUseCase.execute({ name: params.name })
		const { role } = await this.createRoleUseCase.execute(params)
		return { role }
	}
	async update(params: RoleUpdate): Promise<{ role: Role }> {
		const { role } = await this.updateRoleUseCase.execute(params)
		return { role }
	}
	async delete(params: RoleDelete): Promise<{ role: Role }> {
		throw new Error('Method not implemented.')
	}

	async getRole<TData, TResponse>(
		strategy: GetRoleStrategy<TData, TResponse>,
		data: TData,
	): Promise<TResponse> {
		const response = await strategy.execute(data)
		return response
	}
	async getMany<TData, TResponse>(
		strategy: GetManyRoleStrategy<TData, TResponse>,
		data: TData,
	): Promise<TResponse> {
		const response = await strategy.execute(data)
		return response
	}
}
