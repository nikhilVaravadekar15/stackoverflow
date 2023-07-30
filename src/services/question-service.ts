/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/lib/db";
import { User } from "@prisma/client";

class QuestionService {

    async getQuestions() {
        return await db.question.findMany({
            include: {
                user: true
            },
            take: 10,
            orderBy: {
                asked: "asc"
            }
        })
    }

    async insert(question: string, discription: string, user: User) {
        return await db.question.create({
            data: {
                title: question,
                description: discription,
                user: {
                    connect: {
                        email: user.email!
                    }
                }
            }
        })
    }

}

export default new QuestionService()
