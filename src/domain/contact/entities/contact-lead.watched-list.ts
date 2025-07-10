import { WatchedList } from '@/core/entities/watched-list'
import { Lead } from '@/domain/lead/entities/lead.entity'

export class ContactLeadList extends WatchedList<Lead> {
	compareItems(a: Lead, b: Lead): boolean {
		return a.id.equals(b.id)
	}
}
