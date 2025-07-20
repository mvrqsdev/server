import { AggregateRoot } from '@/core/entities/aggregate-root'
import { clock } from '@/core/helpers/dayjs'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

export interface CampaignProps {
	name: string
	externalId: string
	createdAt: Date
	updatedAt?: Date | null
}

export class Campaign extends AggregateRoot<CampaignProps> {
	get name() {
		return this.props.name
	}

	set name(name: string) {
		this.props.name = name
		this.touch()
	}

	get externalId() {
		return this.props.externalId
	}

	set externalId(externalId: string) {
		this.props.externalId = externalId
		this.touch()
	}

	get createdAt() {
		return this.props.createdAt
	}

	get updatedAt() {
		return this.props.updatedAt
	}

	private touch() {
		this.props.updatedAt = clock().toDate()
	}

	static create(props: Optional<CampaignProps, 'createdAt'>, id?: UniqueEntityID) {
		const campaign = new Campaign(
			{
				...props,
				createdAt: props.createdAt ?? clock().toDate(),
			},
			id,
		)

		return campaign
	}
}
