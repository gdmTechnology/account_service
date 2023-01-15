import { CreateAdminController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeCreateAdmin, makeDbAuthentication, makeSignUpValidation } from '@/main/factories'
import { makeLogControllerDecorator } from '../../decorators'

export const makeCreateAdminController = (): Controller => {
    const controller = new CreateAdminController(makeSignUpValidation(), makeCreateAdmin(), makeDbAuthentication())
    return makeLogControllerDecorator(controller)
}
