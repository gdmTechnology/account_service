import { TenantMongoRepository } from '@/infra/db/mongodb'
import { MongoTestDbHelper } from './db.handler'
import { AddTenantRepository } from '@/data/protocols'

import { faker } from '@faker-js/faker'

const makeSut = (): TenantMongoRepository => {
    return new TenantMongoRepository()
}

const addTenantParams = (): AddTenantRepository.Params => ({
    tenantId: 'tenantId',
    companyName: 'companyName',
    companyEmail: 'companyEmail',
    companyTellphone: 'companyTellphone',
    companyCellphone: 'companyCellphone',
    companyCnpj: 'companyCnpj',
    companyAddress: 'companyAddress',
    companyState: 'companyState',
    companyNumber: 'companyNumber',
    companyDistrict: 'companyDistrict',
    companyCity: 'companyCity',
})

describe('TenantMongoRepository', () => {
    beforeAll(async () => await MongoTestDbHelper.connect())
    afterEach(async () => await MongoTestDbHelper.clearDatabase())
    afterAll(async () => await MongoTestDbHelper.disconnect())

    describe('AddTenantRepository()', () => {
        test('Should return company if email is valid', async () => {
            const sut = makeSut()
            const request = addTenantParams()
            const company = await sut.save(request)
            expect(company).toBeDefined()
            expect(company).toHaveProperty('createdAt')
        })
    })
})
