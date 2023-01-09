import { AuthenticationController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeAuthenticationValidation } from '.'
import { makeDbAuthentication } from '@/main/factories'
import { makeLogControllerDecorator } from '../../decorators'

export const makeAuthenticationController = (): Controller => {
    const controller = new AuthenticationController(makeAuthenticationValidation(), makeDbAuthentication())
    return makeLogControllerDecorator(controller)
}
