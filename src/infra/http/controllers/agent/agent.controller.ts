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
import { Agent } from '@/domain/agent/entities/agent.entity'
import { CurrentAgent } from '@/infra/guards/authentication/current-agent.decorator'
import { Roles } from '@/infra/guards/authorization/roles.decorator'
import { AgentPresenter } from '../../presenters/agent/agent.presenter'
import { AgentDetailsPresenter } from '../../presenters/agent/agent-details.presenter'

@Controller('/agents')
@ApiTags('Agents')
export class AgentController {
	@Get('/:agentId')
	@Roles('Admin')
	@ApiOperation({
		summary: 'Obter Agente',
	})
	@HttpCode(200)
	async get(@Param('agentId') agentId: string) {}

	@Get()
	@Roles('Admin')
	@ApiOperation({
		summary: 'Listar Agentes',
	})
	@HttpCode(200)
	async getMany() {}

	@Post()
	@Roles('Admin')
	@ApiOperation({
		summary: 'Criar Agente',
	})
	@HttpCode(201)
	async create(@Body() body: any) {}

	@Put('/:agentId')
	@Roles('Admin', 'Agent')
	@ApiOperation({
		summary: 'Atualizar Agente',
	})
	@HttpCode(201)
	async update(
		@Param('agentId') agentId: string,
		@Body() body: any,
		@CurrentAgent() agent: Agent,
	) {}

	@Delete('/:agentId')
	@Roles('Admin')
	@ApiOperation({
		summary: 'Inativar Agente',
	})
	async delete(@Param('agentId') agentId: string) {}
}
