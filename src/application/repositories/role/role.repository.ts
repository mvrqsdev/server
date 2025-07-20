import { Role } from '@/domain/role/role.entity'

export abstract class RoleRepository {
	abstract create(role: Role): Promise<void>
	abstract save(role: Role): Promise<void>
}
