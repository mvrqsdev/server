import { Module } from '@nestjs/common'
import { ContactRepository } from '@/application/repositories/contact.repository'
import { CheckIfContactAlreadyExistsByNumberUseCase } from '@/application/use-cases/contact/check-if-contact-already-exists.use-case'
import { CreateContactUseCase } from '@/application/use-cases/contact/create-contact.use-case'
import { GetContactStrategyFactory } from '@/application/use-cases/contact/factories/get-contact-strategy.factory'
import { FindContactByIdUseCase } from '@/application/use-cases/contact/find-contact-by-id.use-case'
import { FindContactByNumberUseCase } from '@/application/use-cases/contact/find-contact-by-number.use-case'
import { UpdateContactUseCase } from '@/application/use-cases/contact/update-contact.use-case'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaContactMapper } from './mappers/contact.prisma-mapper'
import { PrismaContactRepository } from './repositories/prisma-contact.repository'

@Module({
	imports: [PrismaCoreModule],
	providers: [
		PrismaContactMapper,
		{
			provide: ContactRepository,
			useClass: PrismaContactRepository,
		},
		GetContactStrategyFactory,
		CheckIfContactAlreadyExistsByNumberUseCase,
		CreateContactUseCase,
		UpdateContactUseCase,
		FindContactByIdUseCase,
		FindContactByNumberUseCase,
	],
	exports: [
		PrismaContactMapper,
		ContactRepository,
		GetContactStrategyFactory,
		CheckIfContactAlreadyExistsByNumberUseCase,
		CreateContactUseCase,
		UpdateContactUseCase,
		FindContactByIdUseCase,
		FindContactByNumberUseCase,
	],
})
export class PrismaContactModule {}
