import { CheckTenantByEmailRepository, AddTenantRepository } from '@/data/protocols/db'

export class CheckTenantByEmailRepositorySpy implements CheckTenantByEmailRepository {
    params: any
    result: any = true
    async check(email: string): Promise<CheckTenantByEmailRepository.Result> {
        this.params = email
        return this.result
    }
}

export class AddTenantRepositorySpy implements AddTenantRepository {
    params: any
    result: any = true
    async save(data: AddTenantRepository.Params): Promise<AddTenantRepository.Result> {
        this.params = data
        return this.result
    }
}
