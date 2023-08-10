/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/lib/db";
import { TEditQuestion, TVotes } from "@/types/types";
import { User } from "@prisma/client";

class QuestionService {

    async getQuestion(id: string) {
        return await db.question.findUnique({
            where: {
                id: id
            },
            include: {
                user: true,
                answers: {
                    include: {
                        user: true,
                    }
                },
                comments: {
                    include: {
                        user: true
                    }
                }
            }
        })
    }

    async getQuestions(limit: number = 10, pageNumber: number = 1, sort: string = "desc", search: string) {
        return await db.$transaction([
            db.question.count({
                where: {
                    title: {
                        contains: search
                    }
                }
            }),
            db.question.findMany({
                include: {
                    user: true
                },
                skip: (pageNumber - 1) * limit,
                take: limit,
                orderBy: {
                    asked: sort == "desc" ? "desc" : "asc"
                },
                where: {
                    title: {
                        contains: search
                    }
                }
            })
        ])
    }

    async getUserAskedQuestions(limit: number = 10, pageNumber: number = 1, sort: string = "desc", email: string) {
        return await db.$transaction([
            db.question.count({
                where: {
                    user: {
                        email: email
                    }
                }
            }),
            db.question.findMany({
                where: {
                    user: {
                        email: email
                    }
                },
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

    // # TODO: Fix this
    // SELECT * FROM question LEFT JOIN answer ON question.user_id = user_id
    async getUserAnsweredQuestions(limit: number = 10, pageNumber: number = 1, sort: string = "desc", email: string) {
        return await db.$transaction([
            db.question.count({
                where: {
                    answers: {
                        every: {
                            user: {
                                email: email
                            }
                        }
                    }
                }
            }),
            db.question.findMany({
                where: {
                    answers: {
                        every: {
                            user: {
                                email: email
                            }
                        }
                    }
                },
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

    async update({ qid, question, description }: TEditQuestion) {
        return await db.question.update({
            where: {
                id: qid
            },
            data: {
                title: question,
                description: description,
                modified: new Date()
            }
        })
    }

    async insert(question: string, description: string, user: User) {
        return await db.question.create({
            data: {
                title: question,
                description: description,
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

    async updateVotes({ id, upvotes, downvotes }: TVotes) {
        return await db.question.update({
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

export default new QuestionService()
