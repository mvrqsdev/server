import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Redis } from 'ioredis'
import { IEnvService } from '@/core/repositories/env-service.interface'

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy, OnModuleInit {
	constructor(envService: IEnvService) {
		super(envService.get('REDIS_URI'))
	}
	onModuleInit() {
		console.log('iniciou o redis')
	}

	onModuleDestroy() {
		return this.disconnect()
	}
}
