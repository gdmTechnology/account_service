import { DeleteAccountController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbDeleteAccount, makeDeleteAccountValidation } from '@/main/factories'
import { makeLogControllerDecorator } from '../../decorators'

export const makeDeleteAccountController = (): Controller => {
    const controller = new DeleteAccountController(makeDeleteAccountValidation(), makeDbDeleteAccount())
    return makeLogControllerDecorator(controller)
}
