import request from 'supertest'
import { Express } from 'express'
import { setupApp } from '@/main/config/app'
import { MongoTestDbHelper } from '../infra/db/db.handler'
import { AccountMongoRepository, TenantMongoRepository } from '@/infra/db/mongodb'

let app: Express
const validJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImlkZW50aWZpY2F0aW9uIiwiaWF0IjoxNjgyMjk3OTYyfQ.oMqQCJOwsWr2gkf46O_X5wSLIvvivGoZkA9nyenkSjw'
const validAdminJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0MGIxMWYxLTE3ZDEtNGUyYi1hNDM0LWM3N2I4MGM1NTRlYyIsImlhdCI6MTY4MjE3MDA5NH0.UQ9U1AMt1cqeE1IyNzPYv0IAsEHLUUyV-XzIt4yrAqE'
const hashedPassword = '$2b$12$cVkcsM1DhD6TSK5NSG5HWetKmyQzvpwexhFfRnUMoRSX9rVGg4Nva'

const addAccountParams = (): any => ({
    email: 'any_email@gmail.com',
    tenant: 'tenantId',
    password: hashedPassword,
    passwordConfirmation: hashedPassword,
    identification: 'identification',
    name: 'name',
    lastName: 'lastName',
    birthDate: new Date(),
    tellphone: 'tellphone',
    cellphone: 'cellphone',
    streetAddress: 'streetAddress',
    numberAddress: 'numberAddress',
    districtAddress: 'districtAddress',
    cityAddress: 'cityAddress',
    stateAddress: 'stateAddress',
    accessToken: validJwtToken,
    role: null
})

const addAdminAccountParams = (): any => ({
    ...addAccountParams(),
    role: 'admin',
    accessToken: validAdminJwt,
    identification: 'f40b11f1-17d1-4e2b-a434-c77b80c554ec',
    email: 'gui.acassemiro@gmail.com'
})

const addTenantParams = (): any => ({
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

const makeSutAccount = (): AccountMongoRepository => {
    return new AccountMongoRepository()
}

const makeSutTenant = (): TenantMongoRepository => {
    return new TenantMongoRepository()
}

const createTenant = async (): Promise<any> => {
    const params = addTenantParams()
    const tenant = await makeSutTenant().save(params)
    return tenant
}

const createAccount = async (): Promise<any> => {
    const account = await makeSutAccount().save(addAccountParams())
    return account
}

const createAdminAccount = async (value): Promise<any> => {
    const account = await makeSutAccount().save(value)
    return account
}

const loadAccount = async (): Promise<any> => {
    const account = await makeSutAccount().loadAccountByEmail(addAccountParams().email)
    return account
}

describe('Account Routes', () => {
    beforeAll(async () => {
        app = await setupApp()
        await MongoTestDbHelper.connect()
    })
    beforeEach(async () => await createTenant())
    afterEach(async () => await MongoTestDbHelper.clearDatabase())
    afterAll(async () => await MongoTestDbHelper.disconnect())

    describe('POST /signup', () => {
        test('Should return 200 if succeds', async () => {
            const accountParams = addAccountParams()
            await request(app)
                .post('/api/signup')
                .send(accountParams)
                .expect(200)
        })

        test('Should return 400 if some requiered params is empty', async () => {
            const accountParams = addAccountParams()
            delete accountParams.email
            await request(app)
                .post('/api/signup')
                .send(accountParams)
                .expect(400)
        })

        test('Should return 403 if tenant doesn`t exists', async () => {
            const accountParams = addAccountParams()
            await request(app)
                .post('/api/signup')
                .send({ ...accountParams, tenant: 'invalidTenantId' })
                .expect(403)
        })

        test('Should return 403 if duplicate', async () => {
            await createAccount()
            const accountParams = addAccountParams()
            const httpResponse = await request(app)
                .post('/api/signup')
                .send(accountParams)
            expect(httpResponse.statusCode).toBe(403)
            expect(httpResponse.body).toEqual({ error: 'The received email is already in use' })
        })

        test('Should return 400 if password and passwordConfirmation is not equal', async () => {
            const accountParams = addAccountParams()
            accountParams.passwordConfirmation = 'invalidPassword'
            const httpResponse = await request(app)
                .post('/api/signup')
                .send(accountParams)
            expect(httpResponse.statusCode).toBe(400)
        })
    })

    describe('POST /login', () => {
        test('Should return 200 if login succeds', async () => {
            const accountParams = addAccountParams()
            await createAccount()
            await request(app)
                .post('/api/login')
                .send({
                    email: accountParams.email,
                    password: '100823Gac@'
                })
                .expect(200)
        })

        test('Should return 401 if login fails', async () => {
            const accountParams = addAccountParams()
            await request(app)
                .post('/api/login')
                .send({
                    email: accountParams.email,
                    password: 'wrongPassword'
                })
                .expect(401)
        })

        test('Should return 400 if empty params', async () => {
            const accountParams = addAccountParams()
            await request(app)
                .post('/api/login')
                .send({
                    email: accountParams.email
                })
                .expect(400)
        })
    })

    describe('PUT /account/:identification', () => {
        test('Should return 200 if update succeds', async () => {
            await createAccount()
            await request(app)
                .put('/api/account/identification')
                .set({ 'x-access-token': validJwtToken })
                .send({
                    password: 'newPassword'
                })
                .expect(200)
        })

        test('Should return 401 if invalid token jwt', async () => {
            await createAccount()
            await request(app)
                .put('/api/account/identification')
                .set({ 'x-access-token': 'invalidJwt' })
                .send({
                    password: 'newPassword'
                })
                .expect(401)
        })

        test('Should return 400 if user not found', async () => {
            await createAccount()
            await request(app)
                .put('/api/account/invalidIdentification')
                .set({ 'x-access-token': validJwtToken })
                .send({
                    password: 'newPassword'
                })
                .expect(400)
        })

        test('Should return 400 if user not found', async () => {
            await createAccount()
            await request(app)
                .put('/api/account/invalidIdentification')
                .set({ 'x-access-token': validJwtToken })
                .send({
                    password: 'newPassword'
                })
                .expect(400)
        })
    })

    describe('GET /account', () => {
        test('Should return 200 if succeds', async () => {
            await createAdminAccount(addAdminAccountParams())
            await request(app)
                .get('/api/account')
                .set({ 'x-access-token': validAdminJwt })
                .expect(200)
        })

        test('Should return 401 if invalid jwt token', async () => {
            await createAdminAccount(addAdminAccountParams())
            await request(app)
                .get('/api/account')
                .set({ 'x-access-token': '' })
                .expect(401)
        })
    })

    describe('GET /account/:identification', () => {
        test('Should return 200 if succeds', async () => {
            await createAdminAccount(addAdminAccountParams())
            await request(app)
                .get(`/api/account/${addAdminAccountParams().identification}`)
                .set({ 'x-access-token': validAdminJwt })
                .expect(200)
        })

        test('Should return 400 if invalid identification', async () => {
            await createAdminAccount(addAdminAccountParams())
            await request(app)
                .get('/api/account/invalidIdentification')
                .set({ 'x-access-token': validAdminJwt })
                .expect(400)
        })

        test('Should return 401 if invalid jwt token', async () => {
            await createAdminAccount(addAdminAccountParams())
            await request(app)
                .get('/api/account/identification')
                .set({ 'x-access-token': '' })
                .expect(401)
        })
    })

    describe('DELETE /account/:identification', () => {
        test('Should return 200 if succeds', async () => {
            await createAdminAccount(addAdminAccountParams())
            await createAccount()
            await request(app)
                .delete('/api/account/identification')
                .set({ 'x-access-token': validAdminJwt })
                .expect(200)
        })

        test('Should return 400 if invalid identification', async () => {
            await createAdminAccount(addAdminAccountParams())
            await request(app)
                .get('/api/account/invalidIdentification')
                .set({ 'x-access-token': validAdminJwt })
                .expect(400)
        })

        test('Should return 401 if invalid jwt token', async () => {
            await request(app)
                .delete('/api/account/identification')
                .set({ 'x-access-token': '' })
                .expect(401)
        })
    })

    describe('POST /account/admin', () => {
        test('Should return 200 if succeds', async () => {
            await createAdminAccount(addAdminAccountParams())
            const newAdmin = {
                ...addAdminAccountParams(),
                email: 'anyAdmin@gmail.com',
                identification: 'newIdentification',
                accessToken: 'accessToken'
            }

            await request(app)
                .post('/api/account/admin')
                .set({ 'x-access-token': validAdminJwt })
                .send(newAdmin)
                .expect(200)
        })
        test('Should return 400 if duplicate', async () => {
            await createAdminAccount(addAdminAccountParams())
            const newAdmin = {
                ...addAdminAccountParams(),
                email: 'anyAdmin@gmail.com',
                identification: 'newIdentification',
                accessToken: 'accessToken'
            }
            await createAdminAccount(newAdmin)
            await request(app)
                .post('/api/account/admin')
                .set({ 'x-access-token': validAdminJwt })
                .send(newAdmin)
                .expect(400)
        })
        test('Should return 401 if invalid jwt', async () => {
            await createAdminAccount(addAdminAccountParams())
            const newAdmin = {
                ...addAdminAccountParams(),
                email: 'anyAdmin@gmail.com',
                identification: 'newIdentification',
                accessToken: 'accessToken'
            }
            await request(app)
                .post('/api/account/admin')
                .set({ 'x-access-token': '' })
                .send(newAdmin)
                .expect(401)
        })
    })
})
