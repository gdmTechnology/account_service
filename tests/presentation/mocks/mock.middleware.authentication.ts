import { LoadAccountByToken } from '@/domain/usecases'
export class LoadAccountByTokenSpy implements LoadAccountByToken {
    params = null
    result = {
        email: 'email',
        name: 'name',
        lastName: 'lastName',
        identification: 'identification',
        birthDate: 'birthDate',
        tellphone: 'tellphone',
        cellphone: 'cellphone',
        streetAddress: 'streetAddress',
        numberAddress: 'numberAddress',
        districtAddress: 'districtAddress',
        cityAddress: 'cityAddress',
        stateAddress: 'stateAddress',
        accessToken: 'accessToken'
    }

    async handle(data: LoadAccountByToken.Request): Promise<any> {
        this.params = data
        return this.result
    }
}
