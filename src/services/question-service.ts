/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/lib/db";
import { User } from "@prisma/client";

class QuestionService {

    async getQuestion(id: string) {
        return await db.question.findUnique({
            where: {
                id: id
            }
        })
    }

    async getQuestions() {
        return await db.question.findMany({
            include: {
                user: true
            },
            take: 10,
            orderBy: {
                asked: "desc"
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

    async deleteQuestion(id: string) {
        return await db.question.delete({
            where: {
                id: id
            }
        })
    }

}

export default new QuestionService()
