import { getAuthSession } from "@/utility/next-auth/auth";
import userService from '@/services/user-service';
import { TQuestionBody, TEditQuestion, TVotes } from '@/types/types';
import { Question, User } from '@prisma/client';
import questionService from '@/services/question-service';


export async function POST(request: Request, response: Response) {
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
        const { id, upvotes, downvotes }: TVotes = await request.json()
        if (id == null || upvotes == null || downvotes == null) {
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
        dbquestion = await questionService.updateVotes({ id, upvotes, downvotes })
        if (!dbquestion) {
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
