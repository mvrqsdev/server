import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Optional } from '@/core/types/optional'
import { Slug } from '@/core/value-objects/slug'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

interface PermissionProps {
	name: string
	description?: string | null
	slug: Slug
	createdAt: Date
	updatedAt?: Date | null
}

export class Permission extends AggregateRoot<PermissionProps> {
	get name() {
		return this.props.name
	}

	set name(name: string) {
		this.props.name = name
		this.props.slug = Slug.create(name)
		this.touch()
	}

	get description() {
		return this.props.description ?? null
	}

	set description(description: string | null) {
		this.props.description = description
		this.touch()
	}

	private touch() {
		this.props.updatedAt = new Date()
	}

	static create(
		props: Optional<PermissionProps, 'createdAt' | 'slug'>,
		id?: UniqueEntityID,
	) {
		const permission = new Permission(
			{
				...props,
				slug: props.slug ?? Slug.create(props.name),
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)

		return permission
	}
}
