import { Module } from '@nestjs/common'
import { AgentRepository } from '@/application/repositories/agents/agent.repository'
import { AuthenticationRepository } from '@/application/repositories/authentication/authentication.repository'
import { ConnectionRepository } from '@/application/repositories/connection/connection.repository'
import { ContactRepository } from '@/application/repositories/contact/contact.repository'
import { LeadRepository } from '@/application/repositories/leads/lead.repository'
import { EnvModule } from '../env/env.module'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAgentRepository } from './prisma/repositories/prisma-agent.repository'
import { PrismaAuthenticationRepository } from './prisma/repositories/prisma-authentication.repository'
import { PrismaConnectionRepository } from './prisma/repositories/prisma-connection.repository'
import { PrismaContactRepository } from './prisma/repositories/prisma-contact.repository'
import { PrismaLeadRepository } from './prisma/repositories/prisma-lead.repository'

@Module({
	imports: [EnvModule],
	providers: [
		PrismaService,
		{
			provide: AuthenticationRepository,
			useClass: PrismaAuthenticationRepository,
		},
		{
			provide: LeadRepository,
			useClass: PrismaLeadRepository,
		},
		{
			provide: ContactRepository,
			useClass: PrismaContactRepository,
		},
		{
			provide: AgentRepository,
			useClass: PrismaAgentRepository,
		},
		{
			provide: ConnectionRepository,
			useClass: PrismaConnectionRepository,
		},
	],
	exports: [
		PrismaService,
		AuthenticationRepository,
		AgentRepository,
		ContactRepository,
		LeadRepository,
		ConnectionRepository,
	],
})
export class DatabaseModule {}
