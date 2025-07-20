import { Injectable } from '@nestjs/common'
import { CacheRepository } from '../cache.repository'
import { RedisService } from './redis.service'

@Injectable()
export class RedisCacheRepository implements CacheRepository {
	private readonly defaultTTL = 60 * 15 // 15 minutos

	constructor(private redis: RedisService) {}

	async set(
		key: string,
		value: string,
		options?: { ttlInSeconds?: number; expireAt?: Date },
	): Promise<void> {
		if (options?.expireAt) {
			const unixTimestamp = Math.floor(options.expireAt.getTime() / 1000)
			await this.redis.set(key, value, 'EXAT', unixTimestamp)
			return
		}

		if (options?.ttlInSeconds) {
			await this.redis.set(key, value, 'EX', options.ttlInSeconds)
			return
		}

		await this.redis.set(key, value, 'EX', this.defaultTTL)
	}

	get(key: string): Promise<string | null> {
		return this.redis.get(key)
	}

	async delete(key: string): Promise<void> {
		await this.redis.del(key)
	}

	// 👇 Adiciona valor em um Set
	async sadd(key: string, value: string): Promise<void> {
		await this.redis.sadd(key, value)
	}

	// 👇 Retorna os membros de um Set
	async smembers(key: string): Promise<string[]> {
		return this.redis.smembers(key)
	}

	// 👇 Remove um membro do Set
	async srem(key: string, value: string): Promise<void> {
		await this.redis.srem(key, value)
	}
}
