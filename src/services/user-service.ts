/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient, User } from "@prisma/client";

class UserService {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async findUserAccount(email: string) {
        return await this.prisma.account.findFirst({
            where: {
                user: {
                    email: email
                }
            },
            include: {
                user: true
            }
        })
    }

}

export default new UserService()
