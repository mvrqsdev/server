import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { DomainError } from '@/core/errors/domain.error'

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		if (exception instanceof DomainError) {
			return this.handleDomainError(exception, response)
		}

		if (exception instanceof HttpException) {
			return this.handleHttpException(exception, response)
		}

		throw exception
	}

	private handleDomainError(error: DomainError, response: Response) {
		const status = error.httpCode ?? 500

		return response.status(status).json({
			statusCode: status,
			message: error.message,
			error: error.name,
		})
	}

	private handleHttpException(exception: HttpException, response: Response) {
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
}
