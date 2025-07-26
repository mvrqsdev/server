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
		summary: 'Get Agent',
	})
	@HttpCode(200)
	async get(@Param(zodValidationGetAgentIdParam) params: GetAgentIdParam) {
		const { agentId } = params
		const { agent } = await this.agentFacade.getAgent('id', {
			agentId,
		})
		return AgentPresenter.toHTTP(agent)
	}

	@Get()
	@ApiOperation({
		summary: 'List Agents',
	})
	@Public()
	@HttpCode(200)
	async getMany(@Query(zodValidationGetManyQueryProps) params: GetManyQueryProps) {
		const { agents } = await this.agentFacade.getMany('filters', { ...params })
		return agents.map(AgentPresenter.toHTTP)
	}

	@Post()
	@ApiOperation({
		summary: 'Create Agent',
	})
	@Public()
	@HttpCode(200)
	async create(@Body(zodValidationCreateAgentBodyProps) body: CreateAgentBodyProps) {
		const { agent } = await this.agentFacade.create(body)
		return AgentPresenter.toHTTP(agent)
	}

	@Put('/:agentId')
	@ApiOperation({
		summary: 'Update Agent',
	})
	@Public()
	@HttpCode(201)
	async update(
		@Param(zodValidationGetAgentIdParam) params: GetAgentIdParam,
		@Body(zodValidationUpdateAgentBodyProps) body: UpdateAgentBodyProps,
	) {
		const { agentId } = params
		const { agent } = await this.agentFacade.update('id', { agentId }, body)
		return AgentPresenter.toHTTP(agent)
	}

	@Post('/:agentId/invite')
	@Public()
	@ApiOperation({
		summary: 'Invite Agent',
	})
	async invite(@Param(zodValidationGetAgentIdParam) params: GetAgentIdParam) {
		const { agentId } = params
		const { agent } = await this.agentFacade.update(
			'id',
			{ agentId },
			{ status: 'Invited' },
		)
		return AgentPresenter.toHTTP(agent)
	}

	@Delete('/:agentId')
	@Public()
	@ApiOperation({
		summary: 'Inactivate Agent',
	})
	async delete(@Param(zodValidationGetAgentIdParam) params: GetAgentIdParam) {
		const { agentId } = params
		const { agent } = await this.agentFacade.update(
			'id',
			{ agentId },
			{ status: 'Inactive' },
		)
		return AgentPresenter.toHTTP(agent)
	}
}
