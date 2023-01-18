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
    email: string
    password: string
    identification: string
    name: string
    lastName?: string
    birthDate?: Date
    tellphone?: string
    cellphone?: string
    streetAddress?: string
    numberAddress?: string
    districtAddress?: string
    cityAddress?: string
    stateAddress?: string
    createdAt?: string
    updatedAt?: string
    role?: string
    isLogged: string
    isActive: string
    accessToken: string
}
