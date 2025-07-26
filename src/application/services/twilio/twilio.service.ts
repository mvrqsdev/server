export abstract class TwillioService {
	abstract send(recipientId: string, content: string): Promise<void>
}
