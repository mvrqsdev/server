import { Module } from '@nestjs/common'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { WebServiceModule } from '@/infra/webservice/webservice.module'
import { UseCasesModule } from '../../use-cases/use-cases.module'
import { CreateConnectionController } from './create-connection.controller'

@Module({
	imports: [DatabaseModule, WebServiceModule, CryptographyModule, UseCasesModule],
	controllers: [CreateConnectionController],
})
export class ConnectionControllersModule {}
