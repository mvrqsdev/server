import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AgentFacade } from '@/application/facades/agent/agent.facade'
import { FindAgentByIdUseCase } from '@/application/use-cases/agent/find-agent-by-id.use-case'
import { GetManyAgentsByFilterUseCase } from '@/application/use-cases/agent/get-many-agents-by-filters.use-case'
import { Public } from '@/infra/guards/authentication/public'
import { AgentPresenter } from '../../presenters/agent/agent.presenter'
import {
	CreateAgentBodyProps,
	GetAgentIdParam,
	GetManyQueryProps,
	UpdateAgentBodyProps,
	zodValidationCreateAgentBodyProps,
	zodValidationGetAgentIdParam,
	zodValidationGetManyQueryProps,
	zodValidationUpdateAgentBodyProps,
} from './interface'

@Controller('/agents')
@ApiTags('Agents')
export class AgentController {
	constructor(
		private agentFacade: AgentFacade,
		private getManyAgentsByFilterUseCase: GetManyAgentsByFilterUseCase,
		private findAgentByIdUseCase: FindAgentByIdUseCase,
	) {}
	@Get('/:agentId')
	@Public()
	@ApiOperation({
		summary: 'Obter Agente',
	})
	@HttpCode(200)
	async get(@Param('agentId') agentId: string) {
		const { agent } = await this.agentFacade.getAgent(this.findAgentByIdUseCase, {
			agentId,
		})
		return AgentPresenter.toHTTP(agent)
	}

	@Get()
	@ApiOperation({
		summary: 'Listar Agentes',
	})
	@Public()
	@HttpCode(200)
	async getMany(@Query(zodValidationGetManyQueryProps) params: GetManyQueryProps) {
		const { agents } = await this.agentFacade.getMany(
			this.getManyAgentsByFilterUseCase,
			params,
		)
		return agents.map(AgentPresenter.toHTTP)
	}

	@Post()
	@ApiOperation({
		summary: 'Criar Agente',
	})
	@Public()
	@HttpCode(200)
	async create(@Body(zodValidationCreateAgentBodyProps) body: CreateAgentBodyProps) {
		const { agent } = await this.agentFacade.create(body)
		return AgentPresenter.toHTTP(agent)
	}

	@Put('/:agentId')
	@ApiOperation({
		summary: 'Atualizar Agente',
	})
	@Public()
	@HttpCode(201)
	async update(
		@Param(zodValidationGetAgentIdParam) params: GetAgentIdParam,
		@Body(zodValidationUpdateAgentBodyProps) body: UpdateAgentBodyProps,
	) {
		const { agentId } = params
		const { agent } = await this.agentFacade.update({ agentId, ...body })
		return AgentPresenter.toHTTP(agent)
	}

	@Delete('/:agentId')
	@ApiOperation({
		summary: 'Inativar Agente',
	})
	async delete(@Param('agentId') agentId: string) {}
}
