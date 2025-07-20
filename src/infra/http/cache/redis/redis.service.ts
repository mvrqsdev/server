import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { Redis } from 'ioredis'
import { IEnvService } from '@/core/repositories/env-service.interface'

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
	constructor(envService: IEnvService) {
		super(envService.get('REDIS_URI'))
	}

	onModuleDestroy() {
		return this.disconnect()
	}
}
