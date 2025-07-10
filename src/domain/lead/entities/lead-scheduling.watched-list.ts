import { WatchedList } from '@/core/entities/watched-list'
import { Scheduling } from '@/domain/scheduling/entities/scheduling.entity'

export class LeadScheduling extends WatchedList<Scheduling> {
	compareItems(a: Scheduling, b: Scheduling): boolean {
		return a.id.equals(b.id)
	}
}
