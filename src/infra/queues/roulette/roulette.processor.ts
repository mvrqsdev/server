/** biome-ignore-all lint/suspicious/noConsole: Necessário para o log de andamento da fila */
import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Job } from 'bullmq'

@Processor('Roulette')
export class RouletteProcessor extends WorkerHost {
	private logger: Logger = new Logger()

	async process(job: Job, token?: string): Promise<any> {
		this.logger.log('Iniciando processamento dos leads.', 'RouletteProcessor')
	}
}
