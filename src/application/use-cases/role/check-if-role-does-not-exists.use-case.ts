import { Injectable } from '@nestjs/common'
import { RoleRepository } from '@/application/repositories/role.repository'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { RoleAlreadyExistsWithSameNameError } from './errors/role-already-exists-with-same-name.error'

export interface CheckIfRoleDoesNotExistsUseCaseRequest {
	name: string
}

@Injectable()
export class CheckIfRoleDoesNotExistsUseCase
	implements BaseUseCase<CheckIfRoleDoesNotExistsUseCaseRequest, void>
{
	constructor(private roleRepository: RoleRepository) {}
	async execute({ name }: CheckIfRoleDoesNotExistsUseCaseRequest): Promise<void> {
		const roleWithSameName = await this.roleRepository.findByName(name)

		if (roleWithSameName) {
			throw new RoleAlreadyExistsWithSameNameError()
		}
	}
}
