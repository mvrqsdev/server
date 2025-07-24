import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { clock } from '@/core/helpers/dayjs'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

export const getAgentIdParam = z.object({ agentId: z.string().uuid() })
export type GetAgentIdParam = z.infer<typeof getAgentIdParam>
export const zodValidationGetAgentIdParam = new ZodValidationPipe(getAgentIdParam)
export class GetAgentParamPropsDTO extends createZodDto(getAgentIdParam) {}

/**
 *
 */
export const getManyQueryProps = z.object({
	agentIds: z.array(z.string().uuid()).optional(),
	name: z.string().optional(),
	email: z.string().optional(),
	master: z
		.string()
		.transform((val) => val === 'true')
		.optional(),
	inRotation: z
		.string()
		.transform((val) => val === 'true')
		.optional(),
	roles: z
		.union([
			z
				.string()
				.uuid()
				.transform((val) => [val]), // caso venha uma única string
			z.array(z.string().uuid()),
		])
		.optional(),
	status: z.array(z.string()).optional(),

	start_created_at: z
		.string()
		.transform((dateStr) => clock(dateStr).startOf('day').toDate())
		.optional(),

	end_created_at: z
		.string()
		.transform((dateStr) => clock(dateStr).endOf('day').toDate())
		.optional(),

	page: z.coerce.number().optional(),
	limit: z.coerce.number().optional(),
	field: z
		.enum([
			'id',
			'name',
			'email',
			'master',
			'isInRotation',
			'status',
			'createdAt',
			'updatedAt',
		])
		.optional(),
	direction: z.enum(['asc', 'desc']).optional(),
})
export type GetManyQueryProps = z.infer<typeof getManyQueryProps>
export const zodValidationGetManyQueryProps = new ZodValidationPipe(getManyQueryProps)
export class GetManyQueryPropsDTO extends createZodDto(getManyQueryProps) {}

/**
 *
 */
export const createAgentBodyProps = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	roles: z.array(z.string().uuid()),
})
export type CreateAgentBodyProps = z.infer<typeof createAgentBodyProps>
export const zodValidationCreateAgentBodyProps = new ZodValidationPipe(
	createAgentBodyProps,
)
export class CreateAgentBodyPropsDTO extends createZodDto(createAgentBodyProps) {}

/**
 *
 */
export const updateAgentBodyProps = z.object({
	name: z.string().optional(),
	email: z.string().email().optional(),
	password: z.string().optional(),
	roles: z.array(z.string().uuid()).optional(),
})
export type UpdateAgentBodyProps = z.infer<typeof updateAgentBodyProps>
export const zodValidationUpdateAgentBodyProps = new ZodValidationPipe(
	updateAgentBodyProps,
)
export class UpdateAgentBodyPropsDTO extends createZodDto(updateAgentBodyProps) {}
