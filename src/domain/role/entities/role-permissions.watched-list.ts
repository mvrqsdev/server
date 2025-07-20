import { WatchedList } from '@/core/entities/watched-list'
import { Permission } from '@/domain/permission/permission.entity'

export class RolePermissions extends WatchedList<Permission> {
	compareItems(a: Permission, b: Permission): boolean {
		return a.id.equals(b.id)
	}
}
