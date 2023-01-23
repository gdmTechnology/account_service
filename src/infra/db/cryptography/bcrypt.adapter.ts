import { Hasher, HashComparer } from '@/data/protocols'

import bcrypt from 'bcrypt'

export class BCryptAdapter implements Hasher, HashComparer {
    constructor(private readonly salt: number) { }
    async hash(password: string): Promise<string> {
        const encryptedPassword = await bcrypt.hash(password, this.salt)
        return encryptedPassword
    }

    async compare(plaintext: string, digest: string): Promise<boolean> {
        const isEqual = await bcrypt.compare(plaintext, digest)
        return isEqual
    }
}
