/* eslint-disable import/no-anonymous-default-export */
import crypto, { BinaryLike } from 'crypto'

class HashService {

    hashOtp(data: BinaryLike): string {
        return crypto.createHmac("sha256", process.env.NEXTAUTH_SECRET!).update(data).digest("hex")
    }

    verifyHashedOtp(receivedHash: string, data: BinaryLike): boolean {
        return this.hashOtp(data) === receivedHash
    }

}

export default new HashService()
