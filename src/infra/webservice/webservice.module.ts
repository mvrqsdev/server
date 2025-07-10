import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { EvolutionModule } from './evolution/evolution.module'

@Module({
	imports: [EnvModule, EvolutionModule],
	exports: [EvolutionModule],
})
export class WebServiceModule {}
