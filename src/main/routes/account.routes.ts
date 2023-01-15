import { adaptRoute } from '@/main/adapters'
import { makeSignUpController, makeUpdateAccountControler, makeAuthenticationController, makeCreateAdminController } from '@/main/factories'

import { Router } from 'express'
import { auth, authAdmin } from '@/main/middlewares'

export default (router: Router): void => {
    router.post('/signup', adaptRoute(makeSignUpController()))
    router.post('/login', adaptRoute(makeAuthenticationController()))
    router.put('/account/update/:identification', auth, adaptRoute(makeUpdateAccountControler()))
    router.post('/account/admin', authAdmin, adaptRoute(makeCreateAdminController()))
}
