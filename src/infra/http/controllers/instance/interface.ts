import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

export const getInstanceIdParam = z.object({ instanceId: z.string().uuid() })
export type GetInstanceIdParam = z.infer<typeof getInstanceIdParam>
export const zodValidationGetInstanceIdParam = new ZodValidationPipe(getInstanceIdParam)
export class GetInstanceParamPropsDTO extends createZodDto(getInstanceIdParam) {}

export const createInstanceBodyProps = z.object({
	name: z.string(),
	agentId: z.string().uuid(),
})
export type CreateInstanceBodyProps = z.infer<typeof createInstanceBodyProps>
export const zodValidationCreateInstanceBodyProps = new ZodValidationPipe(
	createInstanceBodyProps,
)
export class CreateInstanceBodyPropsDTO extends createZodDto(createInstanceBodyProps) {}

export const updateInstanceBodyProps = z.object({
	name: z.string().optional(),
	connection: z.enum(['close', 'connecting']).optional(),
	agentId: z.string().uuid().optional(),
})
export type UpdateInstanceBodyProps = z.infer<typeof updateInstanceBodyProps>
export const zodValidationUpdateInstanceBodyProps = new ZodValidationPipe(
	updateInstanceBodyProps,
)
export class UpdateInstanceBodyPropsDTO extends createZodDto(updateInstanceBodyProps) {}
