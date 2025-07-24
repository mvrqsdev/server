import { Permission } from '@/domain/permission/permission.entity'
import { Role } from '@/domain/role/entities/role.entity'

export abstract class PermissionRepository {
	abstract findById(id: string): Promise<Permission | null>
	abstract findManyByIds(permissionIds: string[]): Promise<Permission[]>
	abstract findManyByRole(role: Role): Promise<Permission[]>
	abstract addPermissionsToRole(role: Role, permissions: Permission[]): Promise<void>
	abstract removePermissionsFromRole(role: Role, permissions: Permission[]): Promise<void>
	abstract create(permission: Permission): Promise<void>
	abstract save(permission: Permission): Promise<void>
}
