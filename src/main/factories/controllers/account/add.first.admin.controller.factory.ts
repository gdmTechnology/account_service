import { CreateAdminController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeSignUpValidation } from '../..'
import { makeDbAddFirstAdmin, makeDbAuthentication } from '@/main/factories'
import { makeLogControllerDecorator } from '../../decorators'

export const makeAddFirstAdminController = (): Controller => {
    const controller = new CreateAdminController(makeSignUpValidation(), makeDbAddFirstAdmin(), makeDbAuthentication())
    return makeLogControllerDecorator(controller)
}
