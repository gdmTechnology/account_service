import { makeAuthMiddleware } from '@/main/factories'
import { adaptMiddleware } from '@/main/adapters'

export const authAdmin = adaptMiddleware(makeAuthMiddleware('admin'))
