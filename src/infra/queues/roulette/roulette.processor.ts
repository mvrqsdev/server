/** biome-ignore-all lint/suspicious/noConsole: Necessário para o log de andamento da fila */
import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Job } from 'bullmq'
import { UpdateInactiveLeadAgentUseCase } from '@/application/use-cases/roulette/update-inactive-lead-agent.use-case'

@Processor('Roulette')
export class RouletteProcessor extends WorkerHost {
	private logger: Logger = new Logger()
	constructor(private updateInactiveLeadAgent: UpdateInactiveLeadAgentUseCase) {
		super()
	}

	async process(job: Job, token?: string): Promise<any> {
		this.logger.log('Iniciando processamento dos leads.', 'RouletteProcessor')
		const result = await this.updateInactiveLeadAgent.execute()

		if (result.isLeft()) {
			this.logger.log('Nenhum agente disponivel na roleta.', 'RouletteProcessor')
		}

		if (result.isRight()) {
			this.logger.log('Todos as Leads foram processadas.', 'RouletteProcessor')
		}
	}
}
