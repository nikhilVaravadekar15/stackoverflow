/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/lib/db";
import { User } from "@prisma/client";

class QuestionService {

    async getQuestion(id: string) {
        return await db.question.findUnique({
            where: {
                id: id
            },
            include: {
                user: true,
                answers: true,
                comments: true
            }
        })
    }

    async getQuestions(limit: number = 10, pageNumber: number = 1, sort: string = "desc", search: string = "") {
        return await db.$transaction([
            db.question.count(),
            db.question.findMany({
                include: {
                    user: true
                },
                skip: (pageNumber - 1) * limit,
                take: limit,
                orderBy: {
                    asked: sort == "desc" ? "desc" : "asc"
                }
            })
        ])
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
