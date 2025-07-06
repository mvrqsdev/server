import { Injectable } from '@nestjs/common'
import { createPrivateKey, createPublicKey, privateDecrypt, publicEncrypt } from 'crypto'
import { Decrypter } from '@/domain/real-state/application/cryptography/decrypter'
import { Encrypter } from '@/domain/real-state/application/cryptography/encrypter'
import { EnvService } from '../env/env.service'

@Injectable()
export class RsaEncrypter implements Encrypter, Decrypter {
	private readonly privateKey: string
	private readonly publicKey: string

	constructor(private envService: EnvService) {
		this.privateKey = Buffer.from(envService.get('AUTH_PRIVATE_KEY'), 'base64').toString()
		this.publicKey = Buffer.from(envService.get('AUTH_PUBLIC_KEY'), 'base64').toString()
	}

	async encrypt(value: string): Promise<string | null> {
		try {
			const buffer = Buffer.from(value, 'utf8')
			const encrypted = publicEncrypt(
				{
					key: createPublicKey(this.publicKey),
					padding: 4,
				},
				buffer,
			)
			return encrypted.toString('base64')
		} catch {
			return null
		}
	}

	async decrypt(encryptedValue: string): Promise<string | null> {
		try {
			const buffer = Buffer.from(encryptedValue, 'base64')
			const decrypted = privateDecrypt(
				{
					key: createPrivateKey(this.privateKey),
					padding: 4,
				},
				buffer,
			)
			return decrypted.toString('utf8')
		} catch {
			return null
		}
	}
}
