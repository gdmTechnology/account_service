export interface AddTenant {
    handle: (data: AddTenant.Request) => Promise<AddTenant.Result>
}

export namespace AddTenant {
    export type Request = {
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
    }
    export type Result = {
        tenantId: string
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
        updatedAt: Date
    }
}
