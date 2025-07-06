import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { GetAuthenticationAndAgentByTokenUseCase } from '@/domain/real-state/application/use-cases/get-authentication-and-agent-by-token.use-case'
import { RevokeAuthenticationUseCase } from '@/domain/real-state/application/use-cases/revoke-authentication.use-case'
import { UpdateAuthenticationExpirationUseCase } from '@/domain/real-state/application/use-cases/update-authentication-expiration.use-case'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticationGuard } from './authentication.guard'

@Module({
	imports: [DatabaseModule, CryptographyModule],
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
