export interface CheckAccountByEmail {
    handle: (data: CheckAccountByEmail.Request) => Promise<CheckAccountByEmail.Result>
}

export namespace CheckAccountByEmail {
    export type Request = {
        email: string
    }
    export type Result = boolean
}
