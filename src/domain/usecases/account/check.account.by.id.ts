export interface CheckAccountById {
    handle: (data: CheckAccountById.Request) => Promise<CheckAccountById.Result>
}

export namespace CheckAccountById {
    export type Request = {
        identification: string
    }
    export type Result = boolean
}
