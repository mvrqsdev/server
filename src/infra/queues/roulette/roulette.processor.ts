/** biome-ignore-all lint/suspicious/noConsole: Necessário para o log de andamento da fila */
import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Job } from 'bullmq'
import { UpdateInactiveLeadAgentUseCase } from '@/application/use-cases/roulette/update-inactive-lead-agent.use-case'

@Processor('Roulette')
export class RouletteProcessor extends WorkerHost {
	constructor(private updateInactiveLeadAgent: UpdateInactiveLeadAgentUseCase) {
		super()
	}

	async process(job: Job, token?: string): Promise<any> {
		// console.log('[Roulette] => Iniciando processamento dos leads.')
		const result = await this.updateInactiveLeadAgent.execute()

		if (result.isLeft()) {
			// console.log('[Roulette] => Nenhum agente disponivel na roleta.')
		}

		if (result.isRight()) {
			// console.log('[Roulette] => Todos as Leads foram processadas.')
		}
	}
}
