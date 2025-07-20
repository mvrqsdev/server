import { RoleRepository } from '@/application/repositories/role/role.repository'
import { Role } from '@/domain/role/role.entity'

export class PrismaRoleRepository implements RoleRepository {
	create(role: Role): Promise<void> {
		throw new Error('Method not implemented.')
	}
	save(role: Role): Promise<void> {
		throw new Error('Method not implemented.')
	}
}
