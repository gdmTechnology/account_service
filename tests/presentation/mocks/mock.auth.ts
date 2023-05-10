import { Authentication } from '@/domain/usecases'

const birthDate = new Date('2017-02-02T12:54:59.218Z')

export class AuthSpy implements Authentication {
    input: Authentication.Request
    result = {
        email: 'email',
        name: 'name',
        tenant: 'tenant',
        identification: 'identification',
        lastName: 'lastName',
        birthDate,
        tellphone: 'tellphone',
        cellphone: 'cellphone',
        streetAddress: 'streetAddress',
        numberAddress: 'numberAddress',
        districtAddress: 'districtAddress',
        cityAddress: 'cityAddress',
        stateAddress: 'stateAddress',
        accessToken: 'accessToken'
    }

    async handle(input: Authentication.Request): Promise<Authentication.Result> {
        this.input = input
        return this.result
    }
}
