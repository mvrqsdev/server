import { Module } from '@nestjs/common'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { WebServiceModule } from '@/infra/webservice/webservice.module'

@Module({
	imports: [PrismaModule, WebServiceModule, CryptographyModule],
	controllers: [
		// CreateLeadController, GetLeadByIdController, UpdateLeadController
	],
})
export class LeadControllersModule {}
