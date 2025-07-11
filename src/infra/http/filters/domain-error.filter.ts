import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
	Injectable,
} from '@nestjs/common'
import { DomainError } from '@/core/errors/errors/domain.error'

@Injectable()
@Catch()
export class DomainErrorFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()

		if (exception instanceof DomainError) {
			response.status(HttpStatus.CONFLICT).json({
				statusCode: HttpStatus.CONFLICT,
				message: exception.message,
				error: 'Conflict',
			})
			return
		}

		// Se não for tratado, repropaga o erro
		throw exception
	}
}
