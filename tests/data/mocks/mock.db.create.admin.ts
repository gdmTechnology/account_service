import env from '@/main/config/env'
import { LoadAccountByIdRepository } from '@/data/protocols/db'

export class LoadAccountByIdRepositorySpy implements LoadAccountByIdRepository {
    params: any
    result: any = {
        email: env.adminEmail,
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

    async loadAccountById(identification: string): Promise<LoadAccountByIdRepository.Result> {
        this.params = identification
        return this.result
    }
}
