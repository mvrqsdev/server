import { z } from 'zod'

export const envSchema = z.object({
	DATABASE_URL: z.string().url(),
	REDIS_URI: z.string().url(),
	PORT: z.coerce.number().optional().default(3333),
	EVOLUTION_ENDPOINT: z.string().url(),
	EVOLUTION_API_KEY: z.string(),
	AUTH_PRIVATE_KEY: z.string(),
	AUTH_PUBLIC_KEY: z.string(),
	AUTH_EXPIRATION_DAYS: z.coerce.number().optional().default(7),
})

export type Env = z.infer<typeof envSchema>
