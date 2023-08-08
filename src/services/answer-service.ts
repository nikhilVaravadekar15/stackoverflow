/* eslint-disable import/no-anonymous-default-export */

import { db } from "@/lib/db"
import { TVotes } from "@/types/types"

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

    async updateVotes({ id, upvotes, downvotes }: TVotes) {
        return await db.answer.update({
            where: {
                id: id
            },
            data: {
                upvotes: upvotes,
                downvotes: downvotes
            }
        })
    }

}

export default new AnswerService()
