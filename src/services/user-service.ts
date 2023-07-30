/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/lib/db";
import { PrismaClient, User } from "@prisma/client";

class UserService {

    async findUserAccount(email: string) {
        return await db.account.findFirst({
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

    async findUniqueUser(email: string) {
        return await db.user.findUnique({
            where: {
                email: email
            }
        })
    }

}

export default new UserService()
