export interface GetUser {
    handle: (data: GetUser.Request) => Promise<GetUser.Result>
}

export namespace GetUser {
    export type Request = {
        identification: string
    }
    export type Result = AccountType
}

type AccountType = {
    identification: string
    email: string
    password: string
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
    role: string
    isLogged: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    accessToken: string
}
