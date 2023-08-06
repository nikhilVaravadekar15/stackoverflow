/* eslint-disable import/no-anonymous-default-export */

import { db } from "@/lib/db"

class AnswerService {

    async insertAnswer(userId: string, questionId: string, answer: string) {
        return await db.answer.create({
            data: {
                description: answer,
                Question: {
                    connect: {
                        id: questionId
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })

    }

    async updateAnswer(answerId: string, updateAnswer: string) {
        return await db.answer.update({
            where: {
                id: answerId
            },
            data: {
                description: updateAnswer,
                modified: new Date()
            }
        })

    }

}

export default new AnswerService()
