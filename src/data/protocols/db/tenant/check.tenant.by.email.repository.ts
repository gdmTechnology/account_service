import { CheckTenantByEmail } from '@/domain/usecases'

export interface CheckTenantByEmailRepository {
    check: (email: string) => Promise<CheckTenantByEmailRepository.Result>
}

export namespace CheckTenantByEmailRepository {
    export type Result = CheckTenantByEmail.Result
}
