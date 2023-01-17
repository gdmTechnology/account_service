import { adaptRoute } from '@/main/adapters'
import { makeSignUpController, makeUpdateAccountControler, makeAuthenticationController, makeCreateAdminController, makeListUsersController, makeDeleteAccountController } from '@/main/factories'

import { Router } from 'express'
import { auth, authAdmin } from '@/main/middlewares'

export default (router: Router): void => {
    router.post('/signup', adaptRoute(makeSignUpController()))
    router.post('/login', adaptRoute(makeAuthenticationController()))
    router.put('/account/:identification', auth, adaptRoute(makeUpdateAccountControler()))
    router.get('/account', authAdmin, adaptRoute(makeListUsersController()))
    router.delete('/account/:identification', authAdmin, adaptRoute(makeDeleteAccountController()))
    router.post('/account/admin', authAdmin, adaptRoute(makeCreateAdminController()))
}
