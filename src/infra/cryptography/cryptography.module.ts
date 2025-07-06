import { Module } from '@nestjs/common'
import { Decrypter } from '@/domain/real-state/application/cryptography/decrypter'
import { Encrypter } from '@/domain/real-state/application/cryptography/encrypter'
import { HashComparer } from '@/domain/real-state/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/real-state/application/cryptography/hash-generator'
import { EnvModule } from '../env/env.module'
import { BcryptHasher } from './bcrypt-hasher'
import { RsaEncrypter } from './rsa-encrypter'

@Module({
	imports: [EnvModule],
	providers: [
		{ provide: Decrypter, useClass: RsaEncrypter },
		{ provide: Encrypter, useClass: RsaEncrypter },
		{ provide: HashComparer, useClass: BcryptHasher },
		{ provide: HashGenerator, useClass: BcryptHasher },
	],
	exports: [Encrypter, Decrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
