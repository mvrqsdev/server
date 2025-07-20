import { forwardRef, Module } from '@nestjs/common'
import { ContactRepository } from '@/application/repositories/contact/contact.repository'
import { FacadeModule } from '@/infra/http/facades/facade.module'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaContactRepository } from './repositories/prisma-contact.repository'

@Module({
	imports: [PrismaCoreModule, forwardRef(() => FacadeModule)],
	providers: [
		{
			provide: ContactRepository,
			useClass: PrismaContactRepository,
		},
	],
	exports: [ContactRepository],
})
export class PrismaContactModule {}
