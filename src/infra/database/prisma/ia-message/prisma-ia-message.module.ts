import { Module } from '@nestjs/common'
import { IAMessageRepository } from '@/application/repositories/ia-message.repository'
import { CreateIAMessageUseCase } from '@/application/use-cases/ia-message/create-ia-message.use-case'
import { GetIAMessageStrategyFactory } from '@/application/use-cases/ia-message/factories/get-ia-message-strategy.factory'
import { GetManyIAMessagesStrategyFactory } from '@/application/use-cases/ia-message/factories/get-many-ia-messages-strategy.factory'
import { FindIAMessageByIdUseCase } from '@/application/use-cases/ia-message/find-ia-message-by-id.use-case'
import { FindManyIAMessagesByLeadId } from '@/application/use-cases/ia-message/find-many-ia-messages-by-lead-id.use-case'
import { UpdateIAMessageUseCase } from '@/application/use-cases/ia-message/update-ia-message.use-case'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaIAMessageMapper } from './mapper/ia-message.prisma-mapper'
import { PrismaIAMessageRepository } from './repositories/prisma-ia-message.repository'

@Module({
	imports: [PrismaCoreModule],
	providers: [
		PrismaIAMessageMapper,
		{
			provide: IAMessageRepository,
			useClass: PrismaIAMessageRepository,
		},
		GetIAMessageStrategyFactory,
		GetManyIAMessagesStrategyFactory,
		CreateIAMessageUseCase,
		UpdateIAMessageUseCase,
		FindIAMessageByIdUseCase,
		FindManyIAMessagesByLeadId,
	],
	exports: [
		PrismaIAMessageMapper,
		IAMessageRepository,
		GetIAMessageStrategyFactory,
		GetManyIAMessagesStrategyFactory,
		CreateIAMessageUseCase,
		UpdateIAMessageUseCase,
		FindIAMessageByIdUseCase,
		FindManyIAMessagesByLeadId,
	],
})
export class PrismaAIModule {}
