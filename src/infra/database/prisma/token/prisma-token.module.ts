import { Module } from '@nestjs/common'
import { TokenRepository } from '@/application/repositories/token.repository'
import { CreateTokenUseCase } from '@/application/use-cases/token/create-token.use-case'
import { GenerateTokenStrategyFactory } from '@/application/use-cases/token/factories/generate-token-strategy.factory'
import { GetManyTokensStrategyFactory } from '@/application/use-cases/token/factories/get-many-tokens-strategy.factory'
import { GetTokenStrategyFactory } from '@/application/use-cases/token/factories/get-token-strategy.factory'
import { FindAllTokensByFiltersUseCase } from '@/application/use-cases/token/find-all-tokens-by-filters.use-case'
import { FindTokenByIdUseCase } from '@/application/use-cases/token/find-token-by-id.use-case'
import { FindTokenByTokenCodeUseCase } from '@/application/use-cases/token/find-token-by-token-code.use-case'
import { GenerateConfirmEmailTokenUseCase } from '@/application/use-cases/token/generate-confirm-email-token.use-case'
import { GenerateInviteTokenUseCase } from '@/application/use-cases/token/generate-invite-token.use-case'
import { GenerateRecoveryTokenUseCase } from '@/application/use-cases/token/generate-recovery-token.use-case'
import { MarkTokenAsUsedUseCase } from '@/application/use-cases/token/mark-token-as-used.use-case'
import { EnvModule } from '@/infra/env/env.module'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaTokenMapper } from './mappers/token.prisma-mapper'
import { PrismaTokenRepository } from './repositories/prisma-token.repository'

@Module({
	imports: [PrismaCoreModule, EnvModule],
	providers: [
		PrismaTokenMapper,
		{
			provide: TokenRepository,
			useClass: PrismaTokenRepository,
		},
		GetTokenStrategyFactory,
		GetManyTokensStrategyFactory,
		GenerateTokenStrategyFactory,
		CreateTokenUseCase,
		GenerateConfirmEmailTokenUseCase,
		GenerateInviteTokenUseCase,
		GenerateRecoveryTokenUseCase,
		FindTokenByIdUseCase,
		FindTokenByTokenCodeUseCase,
		FindAllTokensByFiltersUseCase,
		MarkTokenAsUsedUseCase,
	],
	exports: [
		PrismaTokenMapper,
		TokenRepository,
		GetTokenStrategyFactory,
		GetManyTokensStrategyFactory,
		GenerateTokenStrategyFactory,
		CreateTokenUseCase,
		GenerateConfirmEmailTokenUseCase,
		GenerateInviteTokenUseCase,
		GenerateRecoveryTokenUseCase,
		FindTokenByIdUseCase,
		FindTokenByTokenCodeUseCase,
		FindAllTokensByFiltersUseCase,
		MarkTokenAsUsedUseCase,
	],
})
export class PrismaTokenModule {}
