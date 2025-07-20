export abstract class CacheRepository {
	abstract set(
		key: string,
		value: string,
		options?: { ttlInSeconds?: number; expireAt?: Date },
	): Promise<void>
	abstract get(key: string): Promise<string | null>
	abstract delete(key: string): Promise<void>
	abstract sadd(key: string, value: string): Promise<void>
	abstract smembers(key: string): Promise<string[]>
	abstract srem(key: string, value: string): Promise<void>
}
