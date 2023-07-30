"use client"

import React, { use, useState } from 'react'
import { Button } from '@/components/ui/button';
import Editor from '@/components/Editor';
import { useSession } from "next-auth/react"
import { toast } from '@/components/ui/use-toast';
import { postQuestion } from '@/https';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';


export default function AskaQuestion() {

    const router = useRouter()
    const { data: session, status } = useSession()
    const [loading, setLoading] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>("");
    const [discription, setDiscription] = useState<string>("");

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
                setLoading(true)
                try {
                    const response = await postQuestion({ question, discription })
                    if (response.status === 201) {
                        setLoading(false)
                        router.push("/")
                    } else {
                        throw new Error()
                    }
                } catch (error) {
                    setLoading(false)
                    toast({
                        variant: "destructive",
                        title: "Something went wrong",
                        description: "Please try again.",
                        duration: 3000
                    })
                }
            }
        }
    }

    return (
        <main className="h-screen w-screen p-2 container flex gap-2 items-center justify-center">
            {
                loading && (
                    <div className="absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <Loader />
                    </div>
                )
            }
            <div className={`z-10 h-full w-[80%] flex flex-col gap-1 items-center justify-center ${loading && "pointer-events-none"}`}>
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
                    <Editor content={discription} setContent={setDiscription} />
                </div>
            </div>
        </main >
    )
}
