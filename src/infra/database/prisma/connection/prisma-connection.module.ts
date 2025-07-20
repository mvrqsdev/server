import { forwardRef, Module } from '@nestjs/common'
import { ConnectionRepository } from '@/application/repositories/connection/connection.repository'
import { ConnectionStatusFactory } from '@/application/repositories/connection/factories/connection-status.factory'
import { Close } from '@/application/repositories/connection/states/close'
import { Connecting } from '@/application/repositories/connection/states/connecting'
import { Open } from '@/application/repositories/connection/states/open'
import { PrismaConnectionStatusFactory } from '@/infra/factories/connection-status/prisma-connection-status.factory'
import { FacadeModule } from '@/infra/http/facades/facade.module'
import { PrismaAgentModule } from '../agent/prisma-agent.module'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaConnectionMapper } from './mappers/connection.prisma-mapper'
import { PrismaConnectionRepository } from './repositories/prisma-connection.repository'

@Module({
	imports: [
		PrismaCoreModule,
		forwardRef(() => PrismaAgentModule),
		forwardRef(() => FacadeModule),
	],
	providers: [
		PrismaConnectionMapper,
		{
			provide: 'ConnectionStatusClose',
			useClass: Close,
		},
		{
			provide: 'ConnectionStatusOpen',
			useClass: Open,
		},
		{
			provide: 'ConnectionStatusConnecting',
			useClass: Connecting,
		},
		{
			provide: ConnectionStatusFactory,
			useClass: PrismaConnectionStatusFactory,
		},
		{
			provide: ConnectionRepository,
			useClass: PrismaConnectionRepository,
		},
	],
	exports: [
		PrismaConnectionMapper,
		'ConnectionStatusClose',
		'ConnectionStatusOpen',
		'ConnectionStatusConnecting',
		ConnectionStatusFactory,
		ConnectionRepository,
	],
})
export class PrismaConnectionModule {}
