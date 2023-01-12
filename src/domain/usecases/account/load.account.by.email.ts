export interface LoadAccountByEmail {
    handle: (data: LoadAccountByEmail.Request) => Promise<LoadAccountByEmail.Result>
}

export namespace LoadAccountByEmail {
    export type Request = {
        email: string
    }
    export type Result = {
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
    }
}
