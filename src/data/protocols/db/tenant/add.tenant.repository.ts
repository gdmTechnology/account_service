import { AddTenant } from '@/domain/usecases'

export interface AddTenantRepository {
    save: (data: AddTenantRepository.Params) => Promise<AddTenantRepository.Result>
}

export namespace AddTenantRepository {
    export type Params = AddTenant.Request & { tenantId: string }
    export type Result = AddTenant.Result
}
