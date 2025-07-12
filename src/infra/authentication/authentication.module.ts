import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { GetAuthenticationAndAgentByTokenUseCase } from '@/application/use-cases/authentication/get-authentication-and-agent-by-token.use-case'
import { RevokeAuthenticationUseCase } from '@/application/use-cases/authentication/revoke-authentication.use-case'
import { UpdateAuthenticationExpirationUseCase } from '@/application/use-cases/authentication/update-authentication-expiration.use-case'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { EnvModule } from '../env/env.module'
import { AuthenticationGuard } from './authentication.guard'

@Module({
	imports: [DatabaseModule, CryptographyModule, EnvModule],
	providers: [
		GetAuthenticationAndAgentByTokenUseCase,
		UpdateAuthenticationExpirationUseCase,
		RevokeAuthenticationUseCase,
		{
			provide: APP_GUARD,
			useClass: AuthenticationGuard,
		},
	],
})
export class AuthenticationModule {}
