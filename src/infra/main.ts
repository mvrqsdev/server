import { join } from 'node:path'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'
import * as cookieParser from 'cookie-parser'
import { patchNestJsSwagger } from 'nestjs-zod'
import { IEnvService } from '@/core/repositories/env-service.interface'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {})
	const configService = app.get(IEnvService)
	const port = configService.get('PORT')

	app.use(cookieParser())
	app.enableCors()
	app.setBaseViewsDir(join(__dirname, '..', 'views'))
	app.setViewEngine('hbs')
	app.useBodyParser('json', { limit: '10mb' })
	app.set('trust proxy', 1)
	patchNestJsSwagger()
	const config = new DocumentBuilder()
		.setTitle('Orbita API')
		.setDescription('Documentação da API da Orbita.')
		.setVersion('1.0.0')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('swagger', app, document, {
		jsonDocumentUrl: 'swagger/json',
	})

	app.use(
		'/docs',
		apiReference({
			content: document,
			theme: 'deepSpace',
			hideDarkModeToggle: true,
		}),
	)

	await app.listen(port, '0.0.0.0')
}
bootstrap()
