import { UpdateAccountController } from '@/presentation/controllers'
import { makeDbUpdateAccount, makeLogControllerDecorator, makeUpdateAccountValidation } from '@/main/factories'
import { Controller } from '@/presentation/protocols'

export const makeUpdateAccountControler = (): Controller => {
    const controller = new UpdateAccountController(makeUpdateAccountValidation(), makeDbUpdateAccount())
    return makeLogControllerDecorator(controller)
}
