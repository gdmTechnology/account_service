import { adaptRoute } from '@/main/adapters'
import { makeCreateTenantController } from '@/main/factories'

import { Router } from 'express'
import { authAdmin } from '@/main/middlewares'

export default (router: Router): void => {
    router.post('/tenant', authAdmin, adaptRoute(makeCreateTenantController()))
}
