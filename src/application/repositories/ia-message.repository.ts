import { IAMessage } from '@/domain/ia-message/entities/ia-message.entity'

export abstract class IAMessageRepository {
	abstract findById(id: string): Promise<IAMessage | null>
	abstract findManyByLeadId(leadId: string): Promise<IAMessage[]>
	abstract create(iaMessage: IAMessage): Promise<void>
	abstract save(iaMessage: IAMessage): Promise<void>
}
