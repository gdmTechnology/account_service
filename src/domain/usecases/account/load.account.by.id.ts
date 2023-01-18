export interface LoadAccountById {
    handle: (data: LoadAccountById.Request) => Promise<LoadAccountById.Result | null>
}

export namespace LoadAccountById {
    export type Request = {
        identification: string
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
        createdAt?: string
        updatedAt?: string
        role?: string
        isLogged: string
        isActive: string
        accessToken: string
    }
}
