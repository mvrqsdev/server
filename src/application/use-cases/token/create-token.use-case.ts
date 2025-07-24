import { Injectable } from '@nestjs/common'
import { TokenRepository } from '@/application/repositories/token.repository'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { Token } from '@/domain/token/entities/token.entity'

export interface CreateTokenUseCaseRequest {
	token: Token
}

export interface CreateTokenUseCaseResponse {
	token: Token
}

@Injectable()
export class CreateTokenUseCase
	implements BaseUseCase<CreateTokenUseCaseRequest, CreateTokenUseCaseResponse>
{
	constructor(private tokenRepository: TokenRepository) {}
	async execute({
		token,
	}: CreateTokenUseCaseRequest): Promise<CreateTokenUseCaseResponse> {
		await this.tokenRepository.create(token)

		return {
			token,
		}
	}
}
