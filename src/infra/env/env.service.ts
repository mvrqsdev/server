import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IEnvService } from '@/core/repositories/env-service.interface'
import { Env } from './env'

@Injectable()
export class EnvService implements IEnvService {
	constructor(private configService: ConfigService<Env, true>) {}

	get<T extends keyof Env>(key: T): Env[T] {
		return this.configService.getOrThrow(key, { infer: true })
	}
}
