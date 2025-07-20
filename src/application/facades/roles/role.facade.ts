import { Role } from '@/domain/role/entities/role.entity'
import { GetManyRoleStrategy } from './contract/get-many-role-strategy'
import { GetRoleStrategy } from './contract/get-role-strategy'
import { RoleCreate, RoleDelete, RoleUpdate } from './interface'

export abstract class RoleFacade {
	abstract create(params: RoleCreate): Promise<{ role: Role }>
	abstract update(params: RoleUpdate): Promise<{ role: Role }>
	abstract delete(params: RoleDelete): Promise<{ role: Role }>
	abstract getRole<TData, TResponse>(
		strategy: GetRoleStrategy<TData, TResponse>,
		data: TData,
	): Promise<TResponse>
	abstract getMany<TData, TResponse>(
		strategy: GetManyRoleStrategy<TData, TResponse>,
		data: TData,
	): Promise<TResponse>
}
