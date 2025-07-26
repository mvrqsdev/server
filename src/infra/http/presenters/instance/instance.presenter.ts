import { Instance } from '@/domain/instance/entities/instance.entity'

export class InstancePresenter {
	static toHTTP(instance: Instance) {
		return {
			id: instance.id.toString(),
			name: instance.name,
			ownerJid: instance.ownerJid ? instance.ownerJid.number : null,
			profileName: instance.profileName ?? null,
			profilePicUrl: instance.profilePicUrl ?? null,
			number: instance.number ? instance.number.number : null,
			clientName: instance.clientName ?? null,
			disconnectionAt: instance.disconnectionAt ?? null,
			agentId: instance.agentId.toString(),
			lastQrCode: instance.lastQrCode ?? null,
			createdAt: instance.createdAt,
			updatedAt: instance.updatedAt,
		}
	}
}
