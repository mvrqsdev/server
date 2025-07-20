import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class FolderError extends DomainError {
	constructor() {
		super(ErrorCodes.LEAD.LEAD_STATE.FOLDER.DEFAULT, 403)
	}
}
