// src/@types/express/index.d.ts

import { Agent } from '@/domain/agent/entities/agent.entity'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'

declare module 'express' {
	interface Request {
		agent?: Agent
		authentication?: Authentication
	}
}
