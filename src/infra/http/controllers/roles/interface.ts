import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

export const getRoleIdParam = z.object({ roleId: z.string().uuid() })
export type GetRoleIdParam = z.infer<typeof getRoleIdParam>
export const zodValidationGetRoleIdParam = new ZodValidationPipe(getRoleIdParam)
export class GetRoleParamPropsDTO extends createZodDto(getRoleIdParam) {}

/**
 *
 */
export const createRoleBodyProps = z.object({
	name: z.string(),
	description: z.string(),
	color: z.string(),
	agents: z.array(z.string().uuid()),
	permissions: z.array(z.string().uuid()),
})
export type CreateRoleBodyProps = z.infer<typeof createRoleBodyProps>
export const zodValidationCreateRoleBodyProps = new ZodValidationPipe(createRoleBodyProps)
export class CreateRoleBodyPropsDTO extends createZodDto(createRoleBodyProps) {}

/**
 *
 */
export const updateRoleBodyProps = z.object({
	name: z.string(),
	description: z.string(),
	color: z.string(),
	agents: z.array(z.string().uuid()),
	permissions: z.array(z.string().uuid()),
})
export type UpdateRoleBodyProps = z.infer<typeof updateRoleBodyProps>
export const zodValidationUpdateRoleBodyProps = new ZodValidationPipe(updateRoleBodyProps)
export class UpdateRoleBodyPropsDTO extends createZodDto(updateRoleBodyProps) {}
