import { Module } from '@nestjs/common'
import { ContactRepository } from '@/application/repositories/contact.repository'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaContactRepository } from './repositories/prisma-contact.repository'

@Module({
	imports: [PrismaCoreModule],
	providers: [
		{
			provide: ContactRepository,
			useClass: PrismaContactRepository,
		},
	],
	exports: [ContactRepository],
})
export class PrismaContactModule {}
