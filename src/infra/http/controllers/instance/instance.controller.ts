import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { InstanceFacade } from '@/application/facades/instance/instance.facade'
import { Public } from '@/infra/guards/authentication/public'
import { InstancePresenter } from '../../presenters/instance/instance.presenter'
import {
	CreateInstanceBodyProps,
	GetInstanceIdParam,
	UpdateInstanceBodyProps,
	zodValidationCreateInstanceBodyProps,
	zodValidationGetInstanceIdParam,
	zodValidationUpdateInstanceBodyProps,
} from './interface'

@Controller('/instances')
export class InstanceController {
	constructor(private instanceFacade: InstanceFacade) {}

	@Get('/:instanceId')
	@Public()
	async get(@Param(zodValidationGetInstanceIdParam) params: GetInstanceIdParam) {
		const { instanceId } = params
		const { instance } = await this.instanceFacade.getInstance('id', {
			instanceId: instanceId,
		})
		return InstancePresenter.toHTTP(instance)
	}

	@Post()
	@Public()
	async create(
		@Body(zodValidationCreateInstanceBodyProps) body: CreateInstanceBodyProps,
	) {
		const { instance } = await this.instanceFacade.create(body)
		return InstancePresenter.toHTTP(instance)
	}

	@Put('/:instanceId')
	@Public()
	async update(
		@Param(zodValidationGetInstanceIdParam) params: GetInstanceIdParam,
		@Body(zodValidationUpdateInstanceBodyProps) body: UpdateInstanceBodyProps,
	) {
		const { instanceId } = params
		const { instance } = await this.instanceFacade.update(
			'id',
			{ instanceId: instanceId },
			body,
		)
		return InstancePresenter.toHTTP(instance)
	}
}
