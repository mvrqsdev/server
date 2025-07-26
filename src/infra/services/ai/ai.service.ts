import { groq as groqModel } from '@ai-sdk/groq'
import { Injectable } from '@nestjs/common'
import { LanguageModelV1 } from 'ai'
import { IEnvService } from '@/core/repositories/env-service.interface'

@Injectable()
export class AIService {
	public model: LanguageModelV1
	constructor(private env: IEnvService) {
		this.model = groqModel('llama3-8b-8192')
	}
}
