import { z } from 'zod'

export const envSchema = z.object({
	FRONTEND_URL: z.string().url(),
	DATABASE_URL: z.string().url(),
	REDIS_URI: z.string().url(),
	PORT: z.coerce.number().optional().default(3333),
	SMTP_HOST: z.string(),
	SMTP_PORT: z.coerce.number(),
	SMTP_USER: z.string(),
	SMTP_PASS: z.string(),
	SMTP_FROM: z.string(),
	EVOLUTION_ENDPOINT: z.string().url(),
	EVOLUTION_API_KEY: z.string(),
	AUTH_PRIVATE_KEY: z.string(),
	AUTH_PUBLIC_KEY: z.string(),
	AUTH_COOKIE_NAME: z.string().default('sessionId'),
	AUTH_EXPIRATION_DAYS: z.coerce.number().optional().default(7),
	INVITE_TOKEN_EXPIRATION_TIME: z.coerce.number().optional().default(1440),
	RECOVERY_PASSWORD_TOKEN_EXPIRATION_TIME: z.coerce.number().optional(),
	CONFIRM_EMAIL_TOKEN_EXPIRATION_TIME: z.coerce.number().optional(),
})

export type Env = z.infer<typeof envSchema>
