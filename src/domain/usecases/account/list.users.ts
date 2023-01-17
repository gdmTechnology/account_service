export interface ListUsers {
    handle: () => Promise<ListUsers.Result>
}

export namespace ListUsers {
    export type Result = AccountType[]
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
