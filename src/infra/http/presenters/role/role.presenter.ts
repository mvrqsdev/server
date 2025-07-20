import { Role } from '@/domain/role/entities/role.entity'

export class RolePresenter {
	static toHTTP(role: Role) {
		return {
			id: role.id.toString(),
			name: role.name,
			description: role.description,
			slug: role.slug,
			color: role.color.toString(),
			createdAt: role.createdAt,
			updatedAt: role.updatedAt,
		}
	}
}
