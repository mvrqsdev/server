import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import { DomainError } from '@/core/errors/errors/domain.error'

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		// 1. Trata DomainError (409)
		if (exception instanceof DomainError) {
			return response.status(HttpStatus.CONFLICT).json({
				statusCode: HttpStatus.CONFLICT,
				message: exception.message,
				error: 'Conflict',
			})
		}

		// 2. Trata HttpExceptions (401, 400, etc)
		if (exception instanceof HttpException) {
			const status = exception.getStatus()
			const resBody = exception.getResponse()

			const body =
				typeof resBody === 'string'
					? { message: resBody }
					: (resBody as Record<string, any>)

			return response.status(status).json({
				statusCode: status,
				...body,
			})
		}

		// 3. Exceção não tratada — deixa Nest lidar (500)
		throw exception
	}
}
