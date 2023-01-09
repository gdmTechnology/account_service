import { LogRepository } from '@/data/protocols/db/log'
import { LogModel } from './models'

export class LogMongoRepository implements LogRepository {
    async logError(stack: string): Promise<void> {
        const model = new LogModel({ stack })
        await model.save()
    }

    async getAllLogs(): Promise<any> {
        const logs = await LogModel.find()
        return logs
    }
}
