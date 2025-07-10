import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { EvolutionRepository } from '@/application/webservice/evolution/evolution.repository'
import { EnvModule } from '@/infra/env/env.module'
import { EnvService } from '@/infra/env/env.service'
import { EvolutionService } from './evolution.service'

@Module({
	imports: [
		EnvModule,
		HttpModule.registerAsync({
			imports: [EnvModule],
			inject: [EnvService],
			useFactory: async (envService: EnvService) => ({
				baseURL: envService.get('EVOLUTION_ENDPOINT'),
				headers: {
					apikey: envService.get('EVOLUTION_API_KEY'),
				},
			}),
		}),
	],
	providers: [
		{
			provide: EvolutionRepository,
			useClass: EvolutionService,
		},
	],
	exports: [EvolutionRepository],
})
export class EvolutionModule {}
