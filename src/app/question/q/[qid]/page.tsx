/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    ImCheckboxChecked,
    ImCheckboxUnchecked
} from 'react-icons/im'
import Header from '@/components/Header'
import Preview from '@/components/Preview'
import Share from '@/components/Share'
import Comments from '@/components/Comments'
import UserAvatar from '@/components/UserAvatar'
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { getQuestion, postAnswer, updateAcceptedAnswer } from '@/https'
import Loader, { LoadingSpinner } from '@/components/Loader'
import { toast } from '@/components/ui/use-toast'
import { months } from '@/data'
import Votes from '@/components/Votes'
import Image from 'next/image'
import Editor from '@/components/Editor'
import { Button } from '@/components/ui/button'
import { BiRightArrowAlt } from 'react-icons/bi'
import Error from '@/components/Error'
import { TAcceptedAnswer, TQuestionBody, TUser } from '@/types/types'
import { useSession } from 'next-auth/react'
import { Answer } from '@prisma/client'
import EditQuestionModal from '@/components/EditQuestionModal'
import EditAnswerModal from '@/components/EditAnswerModal'
import DeleteDialog from '@/components/DeleteDialog'


export default function QuestionPage({ params }: { params: { qid: string } }) {

    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: sessionData, status: sessionStatus } = useSession()
    const [customAnswer, setCustomAnswer] = useState<string>("");

    const { isLoading, isError, data: response } = useQuery({
        queryKey: ["question"],
        queryFn: async () => await getQuestion(params.qid)
    })

    const { isLoading: postAnswerIsLoading, isError: postAnswerIsError, mutate: mutateComment, data: postAnswerResponse } = useMutation({
        mutationFn: async ({ question, description }: TQuestionBody) => await postAnswer({ question, description }),
        onSuccess: () => {
            queryClient.invalidateQueries(["question"]);
        }
    })

    function handleCommentSubmit() {
        if (sessionStatus != "authenticated") {
            toast({
                variant: "destructive",
                title: "Please login",
                description: `Login to submit your answer.`,
                duration: 3000
            })
        } else {
            if (customAnswer.trim() === "") {
                toast({
                    variant: "destructive",
                    title: "Answer cannot be empty..",
                    duration: 3000
                })
            } else {
                mutateComment({
                    question: params.qid,
                    description: customAnswer
                })
                setCustomAnswer("");
            }
        }
    }

    return (
        <main className="h-screen w-screen flex flex-col">
            <Header />
            {
                isLoading ? (
                    <div className="absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <Loader />
                    </div>
                ) : (

                    isError ? (
                        <div className="h-full w-full flex items-center justify-center">
                            <Error />
                        </div>
                    ) : (
                        <>
                            <div className="container h-full py-2 flex flex-col gap-2 border rounded-md overflow-y-scroll">
                                <div className="flex flex-col">
                                    <h1 className="text-3xl font-semibold text-slate-700 cursor-pointer">
                                        {response?.data?.data.title}
                                    </h1>
                                    <div className="flex gap-8 items-center">
                                        <div className="flex gap-1 items-center">
                                            <span className="text-sm text-slate-700">Asked</span>
                                            <span className="text-base text-slate-800">
                                                {`${months[new Date(response?.data?.data?.asked.toString()!).getMonth()]} ${new Date(response?.data?.data?.asked.toString()!).getDate()}, ${new Date(response?.data?.data?.asked.toString()!).getFullYear()}`}
                                            </span>
                                        </div>
                                        {
                                            response?.data?.data?.modified?.toString() && (
                                                <div className="flex gap-1 items-center">
                                                    <span className="text-sm text-slate-700">Modified</span>
                                                    <span className="text-base text-slate-800">
                                                        {`${months[new Date(response?.data?.data?.modified.toString()!).getMonth()]} ${new Date(response?.data?.data?.modified.toString()!).getDate()}, ${new Date(response?.data?.data?.modified.toString()!).getFullYear()}`}
                                                    </span>
                                                </div>
                                            )
                                        }
                                        <UserAvatar
                                            name={response?.data?.data?.user!.name}
                                            email={response?.data?.data?.user!.email}
                                            image={response?.data?.data?.user!.image}
                                        />
                                        <Share url={`${process.env.NEXT_PUBLIC_BASE_URL}/question/q/${response?.data?.data?.id}`} />
                                        {
                                            sessionStatus === "authenticated" && sessionData.user.email === response?.data?.data?.user!.email && (
                                                <>
                                                    <EditQuestionModal
                                                        qid={response?.data?.data?.id}
                                                        question={response?.data?.data?.title}
                                                        description={response?.data?.data?.description! ? response?.data?.data?.description! : ""}
                                                    />
                                                </>
                                            )
                                        }
                                        {
                                            sessionStatus === "authenticated" && sessionData.user.email === response?.data?.data?.user!.email && (
                                                <>
                                                    <DeleteDialog
                                                        type="question"
                                                        id={response?.data?.data?.id}
                                                    />
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                                <hr />
                                <div className="flex flex-col gap-12">
                                    <div className="w-full flex gap-2">
                                        <Votes
                                            id={response?.data?.data?.id}
                                            type={"question"}
                                            upvotes={response?.data?.data?.upvotes!}
                                            downvotes={response?.data?.data?.downvotes!}
                                        />
                                        <div className="w-full flex flex-col gap-4">
                                            {
                                                response?.data?.data?.description! && (
                                                    <Preview value={response?.data?.data?.description!} />
                                                )
                                            }
                                            {/* <Comments /> */}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="w-full flex flex-col gap-4 mb-8">
                                        {
                                            postAnswerIsLoading ? (
                                                <Loader />
                                            ) : (
                                                <Answers
                                                    user={response?.data?.data?.user!}
                                                    answers={response?.data?.data?.answers!}
                                                />
                                            )
                                        }
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center justify-between">
                                                <h1 className="text-xl font-semibold text-slate-700 cursor-pointer">
                                                    Your Answer
                                                </h1>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <Button
                                                                asChild
                                                                variant="outline"
                                                                onClick={() => handleCommentSubmit()}
                                                            >
                                                                <div className="flex items-center gap-2 font-semibold">
                                                                    <span>Submit</span>
                                                                    <BiRightArrowAlt size={"1.25rem"} />
                                                                </div>
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            {
                                                                sessionStatus === "authenticated" ? (
                                                                    <p className="p-2">Submit your answer to this question</p>
                                                                ) : (
                                                                    <p className="p-2 text-red-500">Please login to submit your answer to this question</p>
                                                                )
                                                            }
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                            <div className="flex h-56 flex-col gap-12">
                                                <Editor content={customAnswer} setContent={setCustomAnswer} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                )
            }
        </main >
    )
}

function Answers(props: { user: TUser, answers: Answer[] }) {
    const queryClient = useQueryClient();
    const { data: sessionData, status: sessionStatus } = useSession()

    const { isLoading, isError, mutate, data: response } = useMutation({
        mutationFn: async ({ id, acceptedAnswer }: TAcceptedAnswer) => {
            return await updateAcceptedAnswer({ id, acceptedAnswer })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["question"])
        }
    })

    if (isError) {
        toast({
            variant: "destructive",
            title: "Something went wrong",
            description: "Unable to mark as answered, please try again.",
            duration: 3000
        })
    }

    return (
        <>
            {
                props.answers.length === 0 ? (
                    <div className="flex items-center cursor-pointer">
                        <h1 className="text-2xl font-semibold text-slate-700">
                            Not Answered Yet ...
                        </h1>
                        <Image
                            src={"/stack-underflow.jpg"}
                            alt="stack-underflow"
                            width={48}
                            height={48}
                            draggable={false}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        <h1 className="text-3xl font-semibold text-slate-700 cursor-pointer">
                            Answers
                        </h1>
                        <div className="flex flex-col gap-12">
                            {
                                props.answers?.map((answer: Answer | any, index: number) => {
                                    return (
                                        <div className="flex gap-2" key={index}>
                                            <div className="flex gap-8 flex-col items-center">
                                                <Votes
                                                    id={answer.id!}
                                                    type={"answer"}
                                                    upvotes={answer.upvotes!}
                                                    downvotes={answer.downvotes!}
                                                />
                                                {
                                                    sessionStatus === "authenticated" && sessionData.user.email === props.user!.email && (
                                                        isLoading ? (
                                                            <LoadingSpinner />
                                                        ) : (
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger>
                                                                        {
                                                                            answer.acceptedAnswer ? (
                                                                                <ImCheckboxChecked
                                                                                    size={"1.25rem"}
                                                                                    onClick={() => {
                                                                                        mutate({
                                                                                            id: answer.id!,
                                                                                            acceptedAnswer: false
                                                                                        })
                                                                                    }}
                                                                                    className="text-green-500 cursor-pointer"
                                                                                />
                                                                            ) : (
                                                                                <ImCheckboxUnchecked
                                                                                    size={"1.25rem"}
                                                                                    onClick={() => {
                                                                                        mutate({
                                                                                            id: answer.id!,
                                                                                            acceptedAnswer: true
                                                                                        })
                                                                                    }}
                                                                                    className="cursor-pointer"
                                                                                />
                                                                            )
                                                                        }
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        {
                                                                            answer.acceptedAnswer ? (
                                                                                <p className="p-2">Answered</p>
                                                                            ) : (
                                                                                <p className="p-2">Does answer to this question is correct?</p>
                                                                            )
                                                                        }
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        )

                                                    )
                                                }
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {
                                                    answer.description! && (
                                                        <Preview value={answer.description!} />
                                                    )
                                                }
                                                <div className="flex flex-col">
                                                    <div className="flex gap-8 items-center">
                                                        <div className="flex gap-1 items-center">
                                                            <span className="text-sm text-slate-700">Answered</span>
                                                            <span className="text-base text-slate-800">
                                                                {`${months[new Date(answer?.asked.toString()!).getMonth()]} ${new Date(answer?.asked.toString()!).getDate()}, ${new Date(answer?.asked.toString()!).getFullYear()}`}
                                                            </span>
                                                        </div>
                                                        {
                                                            answer?.modified?.toString() && (
                                                                <div className="flex gap-1 items-center">
                                                                    <span className="text-sm text-slate-700">Modified</span>
                                                                    <span className="text-base text-slate-800">
                                                                        {`${months[new Date(answer?.modified.toString()!).getMonth()]} ${new Date(answer?.modified.toString()!).getDate()}, ${new Date(answer?.modified.toString()!).getFullYear()}`}
                                                                    </span>
                                                                </div>
                                                            )
                                                        }
                                                        <UserAvatar
                                                            name={answer?.user!.name}
                                                            email={answer?.user!.email}
                                                            image={answer?.user!.image}
                                                        />
                                                        {
                                                            sessionStatus === "authenticated" && sessionData.user.email === answer?.user!.email && (
                                                                <>
                                                                    <EditAnswerModal
                                                                        qid={answer.id!}
                                                                        description={answer.description! ? answer.description! : ""}
                                                                    />
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            sessionStatus === "authenticated" && sessionData.user.email === answer?.user!.email && (
                                                                <>
                                                                    <DeleteDialog
                                                                        type="answer"
                                                                        id={answer.id!}
                                                                    />
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                {/* <Comments /> */}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div >
                )
            }
        </>
    )
}
