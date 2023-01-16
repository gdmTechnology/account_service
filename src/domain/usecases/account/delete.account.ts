export interface DeleteAccount {
    handle: (identification: string) => Promise<DeleteAccount.Result>
}

export namespace DeleteAccount {
    export type Result = boolean
}
