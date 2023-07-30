import { getAuthSession } from "@/utility/next-auth/auth";
import userService from '@/services/user-service';
import { TQuestionBody } from '@/types/types';
import { Question, User } from '@prisma/client';
import questionService from '@/services/question-service';

export async function GET(request: Request, response: Response) {
    let dbquestions: Question[] | []

    // 2. check all fields are present
    try {
        dbquestions = await questionService.getQuestions()
        if (!dbquestions) {
            throw new Error()
        }
    } catch (error) {
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

    return new Response(
        JSON.stringify(
            {
                "status": true,
                "data": dbquestions!
            }
        ),
        {
            status: 200,
        }
    )
}

export async function POST(request: Request, response: Response) {
    let body: TQuestionBody
    let user: User | null;
    let dbquestion: Question | null

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
    } catch (error) {
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
        const { question, discription }: TQuestionBody = body
        if (!question) {
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
        dbquestion = await questionService.insert(question, discription, user!)
        if (!dbquestion) {
            throw new Error()
        }
    } catch (error) {
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
            status: 201,
        }
    )
}

// # TODO 
export async function DELETE(request: Request, response: Response) {

    let dbquestion: Question | null
    let body: { id: string }

    try {
        // 1. check all fields are present
        body = await request.json()
        const { id } = body
        if (!id) {
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
        // 2. delete question from database
        dbquestion = await questionService.deleteQuestion(id)
        if (!dbquestion) {
            throw new Error()
        }
    } catch (error) {
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

    return new Response(
        JSON.stringify(
            {
                "status": true,
                "dbquestion": dbquestion

            }
        ),
        {
            status: 202,
        }
    )
}
