import { WatchedList } from '@/core/entities/watched-list'
import { Role } from '@/domain/role/role.entity'

export class AgentRoles extends WatchedList<Role> {
	compareItems(a: Role, b: Role): boolean {
		return a.id.equals(b.id)
	}
}
