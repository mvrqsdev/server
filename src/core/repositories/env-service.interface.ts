import { Env } from '@/infra/env/env'

export abstract class IEnvService {
	abstract get<T extends keyof Env>(key: T): Env[T]
}
