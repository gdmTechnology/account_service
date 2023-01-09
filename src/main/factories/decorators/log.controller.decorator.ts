import { LogMongoRepository } from '@/infra/db/mongodb'
import { LogControllerDecorator } from '@/main/decorators'

export const makeLogControllerDecorator = (controller): LogControllerDecorator => {
    const logRepository = new LogMongoRepository()
    return new LogControllerDecorator(controller, logRepository)
}
