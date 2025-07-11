// roles.decorator.ts
import { SetMetadata } from '@nestjs/common'

type roles = 'Admin' | 'Marketing' | 'Agent'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: roles[]) => SetMetadata(ROLES_KEY, roles)
