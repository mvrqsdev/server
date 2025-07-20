import { PermissionRepository } from '@/application/repositories/permission/permission.repository'
import { Permission } from '@/domain/permission/permission.entity'

export class PrismaPermissionRepository implements PermissionRepository {
	create(permission: Permission): Promise<void> {
		throw new Error('Method not implemented.')
	}
	save(permission: Permission): Promise<void> {
		throw new Error('Method not implemented.')
	}
}
