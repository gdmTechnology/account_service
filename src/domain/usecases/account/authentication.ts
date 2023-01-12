export interface Authentication {
    handle: (data: Authentication.Request) => Promise<Authentication.Result>
}

export namespace Authentication {
    export type Request = {
        email: string
        password: string
    }

    export type Result = {
        email: string
        name: string
        lastName: string
        identification: string
        birthDate: Date
        tellphone: string
        cellphone: string
        streetAddress: string
        numberAddress: string
        districtAddress: string
        cityAddress: string
        stateAddress: string
        accessToken: string
    }
}
