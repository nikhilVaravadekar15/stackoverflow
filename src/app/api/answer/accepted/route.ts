import { getAuthSession } from "@/utility/next-auth/auth";
import userService from '@/services/user-service';
import { TAcceptedAnswer, TVotes } from '@/types/types';
import { Answer, Question, User } from '@prisma/client';
import answerService from "@/services/answer-service";


export async function PUT(request: Request, response: Response) {
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
        const { id, acceptedAnswer }: TAcceptedAnswer = await request.json()
        if (id == null || acceptedAnswer == null) {
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
        dbAnswer = await answerService.updateAcceptedAnswer({ id, acceptedAnswer })
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
