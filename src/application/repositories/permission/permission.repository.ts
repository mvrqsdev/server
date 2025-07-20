import { Permission } from '@/domain/permission/permission.entity'

export abstract class PermissionRepository {
	abstract create(permission: Permission): Promise<void>
	abstract save(permission: Permission): Promise<void>
}
