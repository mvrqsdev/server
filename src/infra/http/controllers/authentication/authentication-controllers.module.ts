import { Module } from '@nestjs/common'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { EnvModule } from '@/infra/env/env.module'
import { WebServiceModule } from '@/infra/webservice/webservice.module'
import { UseCasesModule } from '../../use-cases/use-cases.module'
import { AuthenticationLoginController } from './authentication-login.controller'
import { CreateApiKeyController } from './create-api-key.controller'

@Module({
	imports: [
		EnvModule,
		DatabaseModule,
		WebServiceModule,
		CryptographyModule,
		UseCasesModule,
	],
	controllers: [CreateApiKeyController, AuthenticationLoginController],
})
export class AuthenticationControllersModule {}
