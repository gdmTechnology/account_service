import { LoadTenant } from '@/domain/usecases'

export interface LoadTenantRepository {
    load: (tenant: string) => Promise<LoadTenantRepository.Result>
}

export namespace LoadTenantRepository {
    export type Result = LoadTenant.Result
}
