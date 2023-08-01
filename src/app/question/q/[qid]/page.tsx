/* eslint-disable react-hooks/exhaustive-deps */
"use client"

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

    const [loading, setLoading] = useState<boolean>(true);
    const [question, setQuestion] = useState<any | null>(null)
    const [customAnswer, setCustomAnswer] = useState<string>("");

    useEffect(() => {
        async function fetchQuestion() {
            try {
                const res = await getQuestion(params.qid)
                if (res.status === 404) {
                    setLoading(false)
                    notFound()
                } else if (res.status === 500) {
                    throw new Error()
                } else {
                    setQuestion(res.data.data)
                }
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Something went wrong",
                    description: "Please try again.",
                    duration: 3000
                })
            } finally {
                setLoading(false)
            }
        }
        fetchQuestion()
    }, [])

    return (
        <main className="h-screen w-screen flex flex-col">
            {
                loading ? (
                    <div className="absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <Header />
                        <div className="container h-full py-2 flex flex-col gap-2 border rounded-md overflow-y-scroll">
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-semibold text-slate-700 cursor-pointer">
                                    {question?.title}
                                </h1>
                                <div className="flex gap-8 items-center">
                                    <div className="flex gap-1 items-center">
                                        <span className="text-sm text-slate-700">Asked</span>
                                        <span className="text-base text-slate-800">
                                            {`${months[new Date(question?.asked.toString()!).getMonth()]} ${new Date(question?.asked.toString()!).getDate()}, ${new Date(question?.asked.toString()!).getFullYear()}`}
                                        </span>
                                    </div>
                                    {
                                        question?.modified?.toDateString() && (
                                            <div className="flex gap-1 items-center">
                                                <span className="text-sm text-slate-700">Modified</span>
                                                <span className="text-base text-slate-800">
                                                    {`${months[new Date(question?.modified.toString()!).getMonth()]} ${new Date(question?.modified.toString()!).getDate()}, ${new Date(question?.modified.toString()!).getFullYear()}`}
                                                </span>
                                            </div>
                                        )
                                    }
                                    <UserAvatar
                                        name={question?.user!.name}
                                        email={question?.user!.email}
                                        image={question?.user!.image}
                                    />
                                    <Share url={`${process.env.NEXT_PUBLIC_BASE_URL}/question/q/${question?.id}`} />
                                </div>
                            </div>
                            <hr />
                            <div className="flex flex-col gap-12">
                                <div className="w-full flex gap-2">
                                    <Votes
                                        upvotes={question?.upvotes!}
                                        downvotes={question?.downvotes!}
                                    />
                                    <div className="w-full flex flex-col gap-4">
                                        <Preview value={question?.description!} />
                                        {/* <Comments /> */}
                                    </div>
                                </div>
                                <hr />
                                <div className="w-full flex flex-col gap-4 mb-8">
                                    {
                                        question?.answers.length === 0 ? (
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
                                                        question?.answers?.map((answer: Answer, index: number) => {
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
