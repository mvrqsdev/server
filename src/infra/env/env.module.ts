import { Module } from '@nestjs/common'
import { IEnvService } from '@/core/repositories/env-service.interface'
import { EnvService } from './env.service'
@Module({
	providers: [
		{
			provide: IEnvService,
			useClass: EnvService,
		},
	],
	exports: [IEnvService],
})
export class EnvModule {}
