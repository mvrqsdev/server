import { Module } from '@nestjs/common'
import { ConnectionRepository } from '@/application/repositories/connection.repository'
import { ConnectionStatusFactory } from '@/domain/connection/factories/connection-status.factory'
import { Close } from '@/domain/connection/states/close'
import { Connecting } from '@/domain/connection/states/connecting'
import { Open } from '@/domain/connection/states/open'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaConnectionMapper } from './mappers/connection.prisma-mapper'
import { PrismaConnectionRepository } from './repositories/prisma-connection.repository'

@Module({
	imports: [PrismaCoreModule],
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
		ConnectionStatusFactory,
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
