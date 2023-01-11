import { CreateTenantController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeAddTenantValidation } from '.'
import { makeDbAddTenant } from '@/main/factories'
import { makeLogControllerDecorator } from '../../decorators'

export const makeCreateTenantController = (): Controller => {
    const controller = new CreateTenantController(makeAddTenantValidation(), makeDbAddTenant())
    return makeLogControllerDecorator(controller)
}
