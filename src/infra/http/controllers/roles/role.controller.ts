import { Body, Controller, Get, HttpCode, Param, Post, Put } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { RoleFacade } from '@/application/facades/roles/role.facade'
import { Public } from '@/infra/guards/authentication/public'
import { RolePresenter } from '../../presenters/role/role.presenter'
import {
	CreateRoleBodyProps,
	GetRoleIdParam,
	UpdateRoleBodyProps,
	zodValidationCreateRoleBodyProps,
	zodValidationGetRoleIdParam,
	zodValidationUpdateRoleBodyProps,
} from './interface'

@Controller('/roles')
export class RoleController {
	constructor(private roleFacade: RoleFacade) {}

	@Get('/:roleId')
	@HttpCode(200)
	@ApiOperation({
		summary: 'Get Role',
	})
	@Public()
	async get(@Param(zodValidationGetRoleIdParam) params: GetRoleIdParam) {}

	@Get()
	@HttpCode(201)
	@ApiOperation({
		summary: 'List Roles',
	})
	@Public()
	async getMany() {}

	@Post()
	@HttpCode(200)
	@ApiOperation({
		summary: 'Create Role',
	})
	@Public()
	async create(@Body(zodValidationCreateRoleBodyProps) body: CreateRoleBodyProps) {
		const { role } = await this.roleFacade.create(body)
		return RolePresenter.toHTTP(role)
	}

	@Put('/:roleId')
	@HttpCode(200)
	@ApiOperation({
		summary: 'Update Role',
	})
	@Public()
	async update(
		@Param(zodValidationGetRoleIdParam) params: GetRoleIdParam,
		@Body(zodValidationUpdateRoleBodyProps) body: UpdateRoleBodyProps,
	) {
		const { roleId } = params
		const { role } = await this.roleFacade.update({ roleId, ...body })
		return RolePresenter.toHTTP(role)
	}
}
