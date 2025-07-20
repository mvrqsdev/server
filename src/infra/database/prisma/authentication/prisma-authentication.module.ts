import { forwardRef, Module } from '@nestjs/common'

import { AuthenticationRepository } from '@/application/repositories/authentication/authentication.repository'
import { CheckIfAuthenticationIsValidUseCase } from '@/application/use-cases/authentication/check-if-authentication-is-valid.use-case'
import { CreateAuthenticationUseCase } from '@/application/use-cases/authentication/create-authentication.use-case'
import { GetAuthenticationByTokenUseCase } from '@/application/use-cases/authentication/get-authentication-by-token.use-case'
import { RevokeAuthenticationUseCase } from '@/application/use-cases/authentication/revoke-authentication.use-case'
import { UpdateAuthenticationExpirationUseCase } from '@/application/use-cases/authentication/update-authentication-expiration.use-case'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { EnvModule } from '@/infra/env/env.module'
import { FacadeModule } from '@/infra/http/facades/facade.module'
import { PrismaAgentModule } from '../agent/prisma-agent.module'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaAuthenticationRepository } from './repositories/prisma-authentication.repository'

@Module({
	imports: [
		PrismaCoreModule,
		PrismaAgentModule,
		CryptographyModule,
		EnvModule,
		forwardRef(() => FacadeModule),
	],
	providers: [
		{
			provide: AuthenticationRepository,
			useClass: PrismaAuthenticationRepository,
		},
		CheckIfAuthenticationIsValidUseCase,
		CreateAuthenticationUseCase,
		GetAuthenticationByTokenUseCase,
		RevokeAuthenticationUseCase,
		UpdateAuthenticationExpirationUseCase,
	],
	exports: [
		AuthenticationRepository,
		CheckIfAuthenticationIsValidUseCase,
		CreateAuthenticationUseCase,
		GetAuthenticationByTokenUseCase,
		RevokeAuthenticationUseCase,
		UpdateAuthenticationExpirationUseCase,
	],
})
export class PrismaAuthenticationModule {}
