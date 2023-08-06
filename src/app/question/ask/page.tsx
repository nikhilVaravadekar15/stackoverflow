"use client"

import {
    AiFillCaretLeft
} from 'react-icons/ai'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Editor from '@/components/Editor';
import Loader from '@/components/Loader';
import { postQuestion } from '@/https';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { TQuestionBody } from '@/types/types';


export default function AskaQuestion() {

    const router = useRouter()
    const queryClient = useQueryClient();
    const { data: session, status } = useSession()
    const [question, setQuestion] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const { isLoading, isError, data: response, mutate } = useMutation({
        mutationFn: async ({ question, description }: TQuestionBody) => await postQuestion({ question, description }),
    })

    function handleSession() {
        if (status != "authenticated") {
            toast({
                variant: "destructive",
                title: "Please login",
                description: `Login to submit your question.`,
                duration: 3000
            })
        }
    }

    async function handleSubmit() {
        if (status != "authenticated") {
            toast({
                variant: "destructive",
                title: "Please login",
                description: `Login to submit your question.`,
                duration: 3000
            })
        } else {
            if (question === "") {
                toast({
                    variant: "destructive",
                    title: "Question cannot be empty..",
                    duration: 3000
                })
            } else {
                mutate({
                    question,
                    description
                })
            }
        }
    }

    if (isError) {
        toast({
            variant: "destructive",
            title: "Something went wrong",
            description: "Please try again.",
            duration: 3000
        })
    }

    if (response?.status === 201 && response?.data.status === true) {
        router.push("/question/u/asked")
    }

    return (
        <main className="h-screen w-screen p-2 container flex gap-2 items-center justify-center">
            {
                isLoading && (
                    <div className="absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <Loader />
                    </div>
                )
            }
            <Link
                href={"/"}
                passHref={true}
                className="absolute top-0 left-0 h-full w-[5%] flex items-center justify-center cursor-pointer hover:shadow-xl"
            >
                <AiFillCaretLeft className="h-6 w-5 text-slate-700" />
            </Link>
            <div className={`z-10 h-full w-[80%] flex flex-col gap-1 items-center justify-center ${isLoading && "pointer-events-none"}`}>
                <div className="w-full flex gap-2 items-center justify-center">
                    <input
                        onFocus={() => handleSession()}
                        value={question}
                        placeholder="Question"
                        onChange={(event: any) => setQuestion(event.target.value)}
                        className="w-full h-full p-2 resize-none appearance-none overflow-hidden bg-transparent text-2xl font-semibold border border-gray-300 rounded-md focus:outline-none"
                    />
                    <Button
                        className="h-full font-bold text-lg"
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </Button>
                </div>
                <div className="h-[90%] w-full">
                    <Editor content={description} setContent={setDescription} />
                </div>
            </div >
        </main >
    )
}
