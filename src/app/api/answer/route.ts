import answerService from "@/services/answer-service";
import userService from "@/services/user-service";
import { TEditAnswer, TQuestionBody } from "@/types/types";
import { getAuthSession } from "@/utility/next-auth/auth";
import { Answer, Question, User } from "@prisma/client";

export async function POST(request: Request, response: Response) {
    let body: TQuestionBody
    let user: User | null;
    let dbAnswer: Answer | null

    const session = await getAuthSession()

    // 0. check for authenticated/authorized user
    if (!session) {
        return new Response(
            JSON.stringify(
                {
                    "message": "Unauthorized"
                }
            ),
            {
                status: 401,
            }
        )
    }

    // 1. check if user exits
    try {
        user = await userService.findUniqueUser(session.user?.email!)
        if (!user) {
            return new Response(
                JSON.stringify(
                    {
                        "message": "Invalid user"
                    }
                ),
                {
                    status: 404,
                }
            )
        }
    } catch (error: any) {
        console.log(error)
        return new Response(
            JSON.stringify(
                {
                    "message": "Something went wrong, please try again."
                }
            ),
            {
                status: 500,
            }
        )
    }

    // 2. check all fields are present
    try {
        body = await request.json()
        const { question: questionId, discription }: TQuestionBody = body
        if (!questionId && !discription) {
            return new Response(
                JSON.stringify(
                    {
                        "message": "All fields are required,  Missing mandatory fields"
                    }
                ),
                {
                    status: 400,
                }
            )
        }
        // 3. add question to database
        dbAnswer = await answerService.insertAnswer(user.id!, questionId!, discription!)
        if (!dbAnswer) {
            throw new Error()
        }
    } catch (error: any) {
        console.log(error)
        return new Response(
            JSON.stringify(
                {
                    "message": "Something went wrong, please try again."
                }
            ),
            {
                status: 500,
            }
        )
    }

    // 4. response
    return new Response(
        JSON.stringify(
            {
                "status": true,
                "data": dbAnswer
            }
        ),
        {
            status: 201,
        }
    )
}

export async function PUT(request: Request, response: Response) {
    let body: TEditAnswer
    let user: User | null;
    let dbAnswer: Answer | null

    const session = await getAuthSession()

    // 0. check for authenticated/authorized user
    if (!session) {
        return new Response(
            JSON.stringify(
                {
                    "message": "Unauthorized"
                }
            ),
            {
                status: 401,
            }
        )
    }

    // 1. check if user exits
    try {
        user = await userService.findUniqueUser(session.user?.email!)
        if (!user) {
            return new Response(
                JSON.stringify(
                    {
                        "message": "Invalid user"
                    }
                ),
                {
                    status: 404,
                }
            )
        }
    } catch (error: any) {
        console.log(error)
        return new Response(
            JSON.stringify(
                {
                    "message": "Something went wrong, please try again."
                }
            ),
            {
                status: 500,
            }
        )
    }

    // 2. check all fields are present
    try {
        body = await request.json()
        const { qid: answerId, discription: updatedDiscription }: TEditAnswer = body
        if (!answerId && !updatedDiscription) {
            return new Response(
                JSON.stringify(
                    {
                        "message": "All fields are required,  Missing mandatory fields"
                    }
                ),
                {
                    status: 400,
                }
            )
        }
        // 3. add question to database
        dbAnswer = await answerService.updateAnswer(answerId, updatedDiscription)
        if (!dbAnswer) {
            throw new Error()
        }
    } catch (error: any) {
        console.log(error)
        return new Response(
            JSON.stringify(
                {
                    "message": "Something went wrong, please try again."
                }
            ),
            {
                status: 500,
            }
        )
    }

    // 4. response
    return new Response(
        JSON.stringify(
            {
                "status": true
            }
        ),
        {
            status: 200,
        }
    )
}
