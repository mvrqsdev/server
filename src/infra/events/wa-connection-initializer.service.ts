import { Injectable, OnModuleInit } from '@nestjs/common'
import { WAMonitoringService } from '@/application/services/whatsapp/wa-monitoring.service'

@Injectable()
export class WAConnectionInitializer implements OnModuleInit {
	constructor(private waMonitoringService: WAMonitoringService) {}

	async onModuleInit() {
		await this.waMonitoringService.initInstances()
	}
}
