import { Injectable } from '@nestjs/common'
import { InstanceFacade } from '@/application/facades/instance/instance.facade'
import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { CloseConnectionInstanceEvent } from '@/domain/instance/events/close-connection-instance.event'
import { StartConnectingInstanceEvent } from '@/domain/instance/events/start-connecting-instance.event'
import { ChannelInstance } from './channel-instance'
import { ChannelStartupService } from './channel-startup.service'

@Injectable()
export class WAMonitoringService implements EventHandler {
	public readonly waInstances: Record<string, ChannelInstance> = {}

	constructor(
		private channelStartupService: ChannelStartupService,
		private instanceFacade: InstanceFacade,
	) {
		this.setupSubscriptions()
	}
	setupSubscriptions(): void {
		DomainEvents.register(
			this.onStartConnectionInstance.bind(this),
			StartConnectingInstanceEvent.name,
		)
		DomainEvents.register(
			this.onCloseConnectionInstance.bind(this),
			CloseConnectionInstanceEvent.name,
		)
	}

	async initInstances(): Promise<void> {
		const { instances } = await this.instanceFacade.getManyInstance('filter', {
			connections: ['open', 'connecting'],
		})
		for (const instance of instances) {
			const channel = await this.channelStartupService.createChannel(instance)
			this.waInstances[instance.id.toString()] = channel
			await this.waInstances[instance.id.toString()].connectToWhatsapp()
		}
	}

	async onStartConnectionInstance({ instance }: StartConnectingInstanceEvent) {
		const channel = await this.channelStartupService.createChannel(instance)
		this.waInstances[instance.id.toString()] = channel
		await this.waInstances[instance.id.toString()].connectToWhatsapp()
	}

	async onCloseConnectionInstance({ instance }: CloseConnectionInstanceEvent) {
		const instanceId = instance.id.toString()
		const channel = this.waInstances[instanceId]

		if (!channel) return

		await channel.disconnectToWhatsapp()

		delete this.waInstances[instanceId]
	}
}
