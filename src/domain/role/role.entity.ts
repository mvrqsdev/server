import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Optional } from '@/core/types/optional'
import { Slug } from '@/core/value-objects/slug'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { RolePermissions } from './role-permissions.watched-list'
import { HexColor } from './value-objects/hex-color.value-object'

interface RoleProps {
	name: string
	description?: string | null
	slug: Slug
	color: HexColor
	permissions: RolePermissions
	createdAt: Date
	updatedAt?: Date | null
}

export class Role extends AggregateRoot<RoleProps> {
	get name() {
		return this.props.name
	}

	set name(name: string) {
		this.props.name = name
		this.props.slug = Slug.createFromText(name)
		this.touch()
	}

	get description() {
		return this.props.description ?? null
	}

	set description(description: string | null) {
		this.props.description = description
		this.touch()
	}

	get slug() {
		return this.props.slug
	}

	get color() {
		return this.props.color
	}

	set color(color: HexColor) {
		this.props.color = color
		this.touch()
	}

	get permissions() {
		return this.props.permissions
	}

	set permissions(permissions: RolePermissions) {
		this.props.permissions = permissions
		this.touch()
	}

	private touch() {
		this.props.updatedAt = new Date()
	}

	static create(
		props: Optional<RoleProps, 'createdAt' | 'slug' | 'permissions'>,
		id?: UniqueEntityID,
	) {
		const role = new Role(
			{
				...props,
				permissions: props.permissions ?? new RolePermissions(),
				slug: props.slug ?? Slug.createFromText(props.name),
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)

		return role
	}
}
