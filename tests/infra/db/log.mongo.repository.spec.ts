
import { LogMongoRepository } from '@/infra/db/mongodb'
import { MongoTestDbHelper } from './db.handler'

const makeSut = (): LogMongoRepository => {
    return new LogMongoRepository()
}

describe('LogMongoRepository', () => {
    beforeAll(async () => await MongoTestDbHelper.connect())
    afterEach(async () => await MongoTestDbHelper.clearDatabase())
    afterAll(async () => await MongoTestDbHelper.disconnect())

    test('Should create an error log on success', async () => {
        const sut = makeSut()
        await sut.logError('Error')
        const logs = await sut.getAllLogs()
        expect(logs).toBeTruthy()
        expect(logs.length).toBeGreaterThan(0)
    })
})
