import { Module } from '@nestjs/common'

import { AuthenticationRepository } from '@/application/repositories/authentication.repository'
import { CheckIfAuthenticationIsValidUseCase } from '@/application/use-cases/authentication/check-if-authentication-is-valid.use-case'
import { CreateAuthenticationUseCase } from '@/application/use-cases/authentication/create-authentication.use-case'
import { GetAuthenticationFactory } from '@/application/use-cases/authentication/factories/get-authentication-strategy.factory'
import { GetAuthenticationByTokenUseCase } from '@/application/use-cases/authentication/get-authentication-by-token.use-case'
import { RevokeAuthenticationUseCase } from '@/application/use-cases/authentication/revoke-authentication.use-case'
import { UpdateAuthenticationExpirationUseCase } from '@/application/use-cases/authentication/update-authentication-expiration.use-case'
import { EnvModule } from '@/infra/env/env.module'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaAuthenticationMapper } from './mappers/authentication.prisma-mapper'
import { PrismaAuthenticationRepository } from './repositories/prisma-authentication.repository'

@Module({
	imports: [PrismaCoreModule, EnvModule],
	providers: [
		PrismaAuthenticationMapper,
		{
			provide: AuthenticationRepository,
			useClass: PrismaAuthenticationRepository,
		},
		GetAuthenticationFactory,
		CheckIfAuthenticationIsValidUseCase,
		CreateAuthenticationUseCase,
		GetAuthenticationByTokenUseCase,
		RevokeAuthenticationUseCase,
		UpdateAuthenticationExpirationUseCase,
	],
	exports: [
		PrismaAuthenticationMapper,
		AuthenticationRepository,
		GetAuthenticationFactory,
		CheckIfAuthenticationIsValidUseCase,
		CreateAuthenticationUseCase,
		GetAuthenticationByTokenUseCase,
		RevokeAuthenticationUseCase,
		UpdateAuthenticationExpirationUseCase,
	],
})
export class PrismaAuthenticationModule {}
