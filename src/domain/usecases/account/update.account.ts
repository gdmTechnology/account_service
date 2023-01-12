export interface UpdateAccount {
    handle: (update: UpdateAccount.Request) => Promise<UpdateAccount.Result | boolean>
}

export namespace UpdateAccount {
    export type Request = {
        identification: string
        email?: string
        password?: string
        name?: string
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
    export type Result = {
        identification: string
        email?: string
        password?: string
        name?: string
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
