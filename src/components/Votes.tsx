import React, { useState } from 'react'
import {
    BiSolidUpArrow,
    BiSolidDownArrow
} from 'react-icons/bi'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from './ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from './ui/use-toast'
import { TVotes } from '@/types/types'
import { updateAnswer, updateAnswerVote, updateQuestionVote } from '@/https'
import { LoadingSpinner } from './Loader'
import { useSession } from 'next-auth/react'

type TVotesProps = {
    type: "question" | "answer"
} & TVotes

export default function Votes({ id, type, upvotes, downvotes }: TVotesProps) {

    const queryClient = useQueryClient()
    const { data: sessionData, status: sessionStatus } = useSession()

    const { isLoading, isError, mutate, data: response } = useMutation({
        mutationFn: async ({ id, type, upvotes, downvotes }: TVotesProps) => {
            if (type == "question") {
                await updateQuestionVote({ id, upvotes, downvotes })
            }
            if (type == "answer") {
                await updateAnswerVote({ id, upvotes, downvotes })
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["question"])
            toast({
                variant: "default",
                title: "Voted successfully",
                duration: 3000
            })
        },
    })

    if (isError) {
        toast({
            variant: "destructive",
            title: "Something went wrong",
            description: "Unable to vote, please try again.",
            duration: 3000
        })
    }

    return (
        <div className="flex flex-col gap-2 items-center">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            disabled={isLoading}
                            variant="outline"
                            className="rounded-full hover:bg-orange-50"
                            onClick={() => {
                                if (sessionStatus === "unauthenticated") {
                                    toast({
                                        variant: "destructive",
                                        title: "Please login",
                                        description: "You need to be logged in to upvote",
                                        duration: 3000
                                    })
                                    return;
                                } else {
                                    let ups: number = upvotes + 1
                                    mutate({ id, type, upvotes: ups, downvotes })
                                }
                            }}
                        >
                            <BiSolidUpArrow size={"1.25rem"} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span className="p-4">
                            <p>This {type} shows research effort,</p>
                            <p>it is useful and clear</p>
                        </span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <div className="font-bold text-xl">
                {
                    isLoading ? (
                        <div className="h-9 w-9 flex items-center justify-center">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(upvotes - downvotes)
                    )
                }
            </div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            disabled={isLoading}
                            variant="outline"
                            className="rounded-full hover:bg-orange-50"
                            onClick={() => {
                                if (sessionStatus === "unauthenticated") {
                                    toast({
                                        variant: "destructive",
                                        title: "Please login",
                                        description: "You need to be logged in to downvote",
                                        duration: 3000
                                    })
                                    return;
                                } else {
                                    let downs: number = downvotes + 1
                                    mutate({ id, type, upvotes, downvotes: downs })
                                }
                            }
                            }
                        >
                            <BiSolidDownArrow size={"1.25rem"} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span className="p-4">
                            <p>This {type} does not show any research effort,</p>
                            <p>it is unclear or not useful</p>
                        </span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}
