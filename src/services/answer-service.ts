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

}

export default new AnswerService()
