/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import Header from '@/components/Header'
import Preview from '@/components/Preview'
import Share from '@/components/Share'
import Comments from '@/components/Comments'
import UserAvatar from '@/components/UserAvatar'
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react'
import { Answer, Question } from '@prisma/client'
import { getQuestion } from '@/https'
import Loader from '@/components/Loader'
import { toast } from '@/components/ui/use-toast'
import { months } from '@/data'
import Votes from '@/components/Votes'
import Image from 'next/image'
import Editor from '@/components/Editor'


export default function QuestionPage({ params }: { params: { qid: string } }) {

    const queryClient = useQueryClient();
    const [customAnswer, setCustomAnswer] = useState<string>("");

    const { isLoading, isError, data: question } = useQuery({
        queryKey: ["question"],
        queryFn: async () => await getQuestion(params.qid)
    })

    return (
        <main className="h-screen w-screen flex flex-col">
            {
                isLoading ? (
                    <div className="absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <Header />
                        <div className="container h-full py-2 flex flex-col gap-2 border rounded-md overflow-y-scroll">
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-semibold text-slate-700 cursor-pointer">
                                    {question?.data.title}
                                </h1>
                                <div className="flex gap-8 items-center">
                                    <div className="flex gap-1 items-center">
                                        <span className="text-sm text-slate-700">Asked</span>
                                        <span className="text-base text-slate-800">
                                            {`${months[new Date(question?.data?.asked.toString()!).getMonth()]} ${new Date(question?.data?.asked.toString()!).getDate()}, ${new Date(question?.data?.asked.toString()!).getFullYear()}`}
                                        </span>
                                    </div>
                                    {
                                        question?.modified?.toDateString() && (
                                            <div className="flex gap-1 items-center">
                                                <span className="text-sm text-slate-700">Modified</span>
                                                <span className="text-base text-slate-800">
                                                    {`${months[new Date(question?.data?.modified.toString()!).getMonth()]} ${new Date(question?.data?.modified.toString()!).getDate()}, ${new Date(question?.data?.modified.toString()!).getFullYear()}`}
                                                </span>
                                            </div>
                                        )
                                    }
                                    <UserAvatar
                                        name={question?.data?.user!.name}
                                        email={question?.data?.user!.email}
                                        image={question?.data?.user!.image}
                                    />
                                    <Share url={`${process.env.NEXT_PUBLIC_BASE_URL}/question/q/${question?.data?.id}`} />
                                </div>
                            </div>
                            <hr />
                            <div className="flex flex-col gap-12">
                                <div className="w-full flex gap-2">
                                    <Votes
                                        upvotes={question?.data?.upvotes!}
                                        downvotes={question?.data?.downvotes!}
                                    />
                                    <div className="w-full flex flex-col gap-4">
                                        <Preview value={question?.data?.description!} />
                                        {/* <Comments /> */}
                                    </div>
                                </div>
                                <hr />
                                <div className="w-full flex flex-col gap-4 mb-8">
                                    {
                                        question?.data?.answers.length === 0 ? (
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
                                                        question?.data?.answers?.map((answer: Answer, index: number) => {
                                                            return (
                                                                <></>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="flex flex-col gap-3">
                                        <h1 className="text-xl font-semibold text-slate-700 cursor-pointer">
                                            Your Answer
                                        </h1>
                                        <div className="flex h-56 flex-col gap-12">
                                            <Editor content={customAnswer} setContent={setCustomAnswer} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </main >
    )
}

// function AnswerComponent() {
//     return (
//         <div className="flex gap-2">
//             <Votes
//                 upvotes={answer.upvotes!}
//                 downvotes={answer.downvotes!}
//             />
//             <div className="w-full flex flex-col gap-4">
//                 <Preview value={""} />
//                 <Comments />
//             </div>
//         </div>
//     )
// }
