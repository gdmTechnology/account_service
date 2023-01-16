import { ListUsersController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbListUsers } from '@/main/factories'
import { makeLogControllerDecorator } from '../../decorators'

export const makeListUsersController = (): Controller => {
    const controller = new ListUsersController(makeDbListUsers())
    return makeLogControllerDecorator(controller)
}
