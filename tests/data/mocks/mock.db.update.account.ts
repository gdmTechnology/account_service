import { CheckAccountByIdRepository, UpdateAccountRepository } from '@/data/protocols/db'

export class CheckAccountByIdRepositorySpy implements CheckAccountByIdRepository {
    params: any
    result: any = false
    async checkAccountById(email: string): Promise<CheckAccountByIdRepository.Result> {
        this.params = email
        return this.result
    }
}

export class UpdateAccountRepositorySpy implements UpdateAccountRepository {
    params: any
    result: any = {
        identification: 'any_id',
        name: 'updated_name',
        lastName: 'updated_lastName',
        tellphone: 'updated_tellphone',
        cellphone: 'updated_cellphone',
        streetAddress: 'updated_streetAddress',
        numberAddress: 'updated_numberAddress',
        districtAddress: 'updated_districtAddress',
        cityAddress: 'updated_cityAddress',
        stateAddress: 'updated_stateAddress'
    }

    async update(data: UpdateAccountRepository.Params): Promise<UpdateAccountRepository.Result> {
        this.params = data
        return this.result
    }
}
