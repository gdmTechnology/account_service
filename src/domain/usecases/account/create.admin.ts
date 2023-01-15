export interface CreateAdmin {
    handle: (data: CreateAdmin.Request, adminId: string) => Promise<CreateAdmin.Result>
}

export namespace CreateAdmin {
    export type Request = {
        email: string
        password: string
        tenant: string
        identification: string
        name: string
        lastName: string
        birthDate: Date
        tellphone: string
        cellphone: string
        streetAddress: string
        numberAddress: string
        districtAddress: string
        cityAddress: string
        stateAddress: string
        accessToken?: string
        role: string
    }
    export type Result = boolean | string
}
