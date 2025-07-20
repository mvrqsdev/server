import type { Provider } from '@nestjs/common'
import { Close } from '@/application/repositories/connection/states/close'
import { Connecting } from '@/application/repositories/connection/states/connecting'
import { Open } from '@/application/repositories/connection/states/open'

export const ConnectionStatusProviders: Provider[] = [
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
]
