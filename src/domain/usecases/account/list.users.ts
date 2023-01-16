export interface ListUsers {
    handle: () => Promise<ListUsers.Result>
}

export namespace ListUsers {
    export type Result = []
}
