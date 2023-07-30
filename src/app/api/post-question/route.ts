import { Question, User } from '@prisma/client';
import { getAuthSession } from "@/utility/next-auth/auth";
import userService from '@/services/user-service';
import questionService from '@/services/question-service';
import { TQuestionBody } from '@/types/types';


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
        dbquestion = await questionService.insert(question, discription.toString(), user!)
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
