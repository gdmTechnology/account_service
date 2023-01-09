export interface UpdateAccessToken {
    handle: (update: UpdateAccessToken.Request) => Promise<UpdateAccessToken.Result>
}

export namespace UpdateAccessToken {
    export type Request = {
        identification: string
        accessToken: string
    }
    export type Result = boolean
}
