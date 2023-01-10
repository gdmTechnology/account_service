export interface CheckTenantByEmail {
    handle: (companyEmail: string) => Promise<CheckTenantByEmail.Result>
}

export namespace CheckTenantByEmail {
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
