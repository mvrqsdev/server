import { z } from 'zod'

export const envSchema = z.object({
	DATABASE_URL: z.string().url(),
	PORT: z.coerce.number().optional().default(3333),
	EVOLUTION_ENDPOINT: z.string().url(),
	EVOLUTION_API_KEY: z.string(),
})

export type Env = z.infer<typeof envSchema>
