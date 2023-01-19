import { GetUserController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbLoadAccountById, makeGetUserValidation } from '@/main/factories'
import { makeLogControllerDecorator } from '../../decorators'

export const makeGetUserController = (): Controller => {
    const controller = new GetUserController(makeGetUserValidation(), makeDbLoadAccountById())
    return makeLogControllerDecorator(controller)
}
