import { InjectQueue } from '@nestjs/bullmq'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { Queue } from 'bullmq'

@Injectable()
export class RouletteScheduler implements OnModuleInit {
	constructor(@InjectQueue('Roulette') private queue: Queue) {}
	async onModuleInit() {
		await this.queue.add(
			'Roulette',
			{},
			{
				repeat: {
					every: 5000,
				},
				removeOnComplete: true,
			},
		)
	}
}
