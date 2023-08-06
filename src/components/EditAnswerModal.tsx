"use client"

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Editor from './Editor'
import Loader from './Loader'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'
import { updateAnswer } from '@/https'
import { TEditAnswer } from '@/types/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export default function EditAnswerModal({ qid, description }: TEditAnswer) {

    const queryClient = useQueryClient();
    const [editableDescription, setEditableDescription] = useState<string>(description)

    const { isLoading, isError, data: response, mutate } = useMutation({
        mutationFn: async ({ qid, description }: TEditAnswer) => await updateAnswer({ qid, description }),
        onSuccess: () => {
            queryClient.invalidateQueries(["question"])
            toast({
                variant: "default",
                title: "update successfully",
                duration: 3000
            })
        }
    })

    function handleUpdate() {
        if (editableDescription === "") {
            toast({
                variant: "destructive",
                title: "Description cannot be empty..",
                duration: 3000,
            })
            return;
        }
        mutate({
            qid: qid,
            description: editableDescription
        })
    }

    if (isError) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Please try again later.",
            duration: 3000
        })
    }

    return (
        <Dialog>
            <DialogTrigger className="border-none outline-none">
                <div className="border-blue-500 hover:text-blue-500 hover:border-b-2">
                    Edit answer
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-7xl h-[96%] overflow-y-scroll overflow-x-hidden">
                {
                    isLoading && (
                        <div className="absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                            <Loader />
                        </div>
                    )
                }
                <div className={`h-full flex gap-4 flex-col ${isLoading && "pointer-events-none"}`}>
                    <div className="w-[96%] h-full">
                        <Editor
                            content={editableDescription}
                            setContent={setEditableDescription}
                        />
                    </div>
                    <Button
                        className="w-fit font-bold text-lg"
                        onClick={() => handleUpdate()}
                    >
                        Update
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
