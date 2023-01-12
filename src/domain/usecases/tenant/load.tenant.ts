export interface LoadTenant {
    load: (tenant: string) => Promise<LoadTenant.Result>
}

export namespace LoadTenant {
    export type Result = {
        tenantId: string
        companyIdentification: string
        companyName: string
        companyEmail: string
        companyTellphone?: string
        companyCellphone?: string
        companyCnpj: string
        companyAddress?: string
        companyState?: string
        companyNumber?: string
        companyDistrict?: string
        companyCity?: string
        companyIsActived: boolean
        createdAt: Date
        updateAt: Date
    }
}
