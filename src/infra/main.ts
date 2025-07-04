import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'
// import cookieParser from 'cookie-parser'
import { patchNestJsSwagger } from 'nestjs-zod'
import { AppModule } from './app.module'
import { Env } from './env'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const configService = app.get<ConfigService<Env, true>>(ConfigService)
	const port = configService.get('PORT', { infer: true })

	// app.use(cookieParser())
	patchNestJsSwagger()
	const config = new DocumentBuilder()
		.setTitle('Orbita API')
		.setDescription('Documentação da API da Orbita.')
		.setVersion('1.0.0')
		.addCookieAuth('sessionId', {
			type: 'apiKey',
			in: 'cookie',
			name: 'sessionId',
		})
		.build()

	const document = () => SwaggerModule.createDocument(app, config)
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

	await app.listen(port)
}
bootstrap()
