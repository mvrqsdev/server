import { Module } from '@nestjs/common'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { WebServiceModule } from '@/infra/webservice/webservice.module'
import { UseCasesModule } from '../../use-cases/use-cases.module'
import { CreateLeadController } from './create-lead.controller'
import { GetLeadByIdController } from './get-lead-by-id.controller'
import { UpdateLeadController } from './update-lead.controller'

@Module({
	imports: [DatabaseModule, WebServiceModule, CryptographyModule, UseCasesModule],
	controllers: [CreateLeadController, GetLeadByIdController, UpdateLeadController],
})
export class LeadControllersModule {}
