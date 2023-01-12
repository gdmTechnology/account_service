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
    companyCity: 'companyCity'
})

describe('TenantMongoRepository', () => {
    beforeAll(async () => await MongoTestDbHelper.connect())
    afterEach(async () => await MongoTestDbHelper.clearDatabase())
    afterAll(async () => await MongoTestDbHelper.disconnect())

    describe('AddTenantRepository()', () => {
        describe('save()', () => {
            test('Should return a company on success', async () => {
                const sut = makeSut()
                const request = addTenantParams()
                const company = await sut.save(request)
                expect(company).toBeDefined()
                expect(company).toHaveProperty('createdAt')
            })
        })

        describe('check()', () => {
            test('Should return company if email is valid', async () => {
                const sut = makeSut()
                const request = addTenantParams()
                await sut.save(request)
                const company = await sut.check(request.companyEmail)
                expect(company).toBeDefined()
            })

            test('Should return null if email is invalid', async () => {
                const sut = makeSut()
                const request = addTenantParams()
                const company = await sut.check(request.companyEmail)
                expect(company).toBeNull()
            })
        })

        describe('load()', () => {
            test('Should return company if tenant is valid', async () => {
                const sut = makeSut()
                const request = addTenantParams()
                await sut.save(request)
                const company = await sut.load(request.tenantId)
                expect(company).toBeDefined()
            })

            // test('Should return null if email is invalid', async () => {
            //     const sut = makeSut()
            //     const request = addTenantParams()
            //     const company = await sut.check(request.companyEmail)
            //     expect(company).toBeNull()
            // })
        })
    })
})
