import { Module } from '@nestjs/common'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { ServicesModule } from '@/infra/services/services.module'

@Module({
	imports: [PrismaModule, ServicesModule, CryptographyModule],
	controllers: [
		// CreateSchedulingController
	],
})
export class SchedulingControllersModule {}
