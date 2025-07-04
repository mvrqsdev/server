import { Module } from '@nestjs/common'
import { HashComparer } from '@/domain/authentication/cryptography/hash-comparer.service'
import { HashGenerator } from '@/domain/authentication/cryptography/hash-generator.service'
// import { JwtEncrypter } from './jwt-encrypter'
import { BcryptHasher } from './bcrypt-hasher'

@Module({
	providers: [
		// { provide: Encrypter, useClass: JwtEncrypter },
		{ provide: HashComparer, useClass: BcryptHasher },
		{ provide: HashGenerator, useClass: BcryptHasher },
	],
	exports: [
		// Encrypter,
		HashComparer,
		HashGenerator,
	],
})
export class CryptographyModule {}
