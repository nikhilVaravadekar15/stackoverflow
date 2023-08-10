import { getAuthSession } from "@/utility/next-auth/auth";
import userService from '@/services/user-service';
import { TQuestionBody, TEditQuestion } from '@/types/types';
import { Question, User } from '@prisma/client';
import questionService from '@/services/question-service';

export async function GET(request: Request, response: Response) {
    let dbquestionsLength: number
    let dbquestion: Question | null
    let dbquestions: Question[] | []
    const url: URL = new URL(request.url)

    const qid: string = url.searchParams.get("qid")!
    const limit: number = parseInt(url.searchParams.get("limit")!)!
    const pageNumber: number = parseInt(url.searchParams.get("pageNumber")!)!
    const sortBy: string = url.searchParams.get("sortBy")!
    const email: string = url.searchParams.get("email")!
    const answered: boolean = url.searchParams.get("answered")! === "true" ? true : false
    const search: string = url.searchParams.get("search")!

    try {
        if (qid) {
            dbquestion = await questionService.getQuestion(qid)
            if (!dbquestion) {
                throw new Error()
            }
        } else {
            if (email) {
                if (answered) {
                    [dbquestionsLength, dbquestions] = await questionService.getUserAnsweredQuestions(limit, pageNumber, sortBy, email)
                } else {
                    [dbquestionsLength, dbquestions] = await questionService.getUserAskedQuestions(limit, pageNumber, sortBy, email)
                }

                if (!dbquestions) {
                    throw new Error()
                }
            }
            else {
                console.log(search);
                [dbquestionsLength, dbquestions] = await questionService.getQuestions(limit, pageNumber, sortBy, search)
                if (!dbquestions) {
                    throw new Error()
                }
            }
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

    return new Response(
        JSON.stringify(
            {
                "status": true,
                "data": qid ? dbquestion! : {
                    "questions": dbquestions!,
                    "totalPageCount": Math.ceil(dbquestionsLength! / limit)
                }
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
        const { question, description }: TQuestionBody = body
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
        dbquestion = await questionService.insert(question, description, user!)
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
            status: 201,
        }
    )
}

export async function PUT(request: Request, response: Response) {
    let body: TEditQuestion
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
        body = await request.json()
        const { qid, question, description }: TEditQuestion = body
        if (!qid || !question) {
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
        // 3. update question to database
        dbquestion = await questionService.update({ qid, question, description })
        if (!dbquestion) {
            throw new Error()
        }
    } catch (error: any) {
        console.log(error)
        return new Response(
            JSON.stringify(
                {
                    "message": `Question you trying to update does not exist`
                }
            ),
            {
                status: 404,
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

export async function DELETE(request: Request, response: Response) {

    const url: URL = new URL(request.url)
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
        let user: User | null = await userService.findUniqueUser(session.user?.email!)
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
        const id: string = url.searchParams.get("id")!
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
        // 3. delete question to database
        let dbquestion: Question | null = await questionService.deleteQuestion(id)
        if (!dbquestion) {
            throw new Error()
        }
    } catch (error: any) {
        console.log(error)
        return new Response(
            JSON.stringify(
                {
                    "message": `Question you trying to delete does not exist`
                }
            ),
            {
                status: 404,
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
