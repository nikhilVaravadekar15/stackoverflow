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
import { updateQuestion } from '@/https'
import { TEditQuestion } from '@/types/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export default function EditQuestionModal({ qid, question: title, description: description }: TEditQuestion) {

    const queryClient = useQueryClient();
    const [editableTitle, setEditableTitle] = useState<string>(title)
    const [editableDescription, setEditableDescription] = useState<string>(description)

    const { isLoading, isError, data: response, mutate } = useMutation({
        mutationFn: async ({ qid, question, description }: TEditQuestion) => await updateQuestion({ qid, question, description }),
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
        if (editableTitle === "") {
            toast({
                variant: "destructive",
                title: "Title cannot be empty..",
                duration: 3000,
            })
            return;
        }
        mutate({
            qid: qid,
            question: editableTitle,
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
            <DialogTrigger asChild className="border-none outline-none">
                <div className="border-blue-500 hover:text-blue-500 hover:border-b-2">
                    Edit question
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-7xl h-[96%] overflow-y-scroll">
                {
                    isLoading && (
                        <div className="absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                            <Loader />
                        </div>
                    )
                }
                <DialogHeader className={`h-full ${isLoading && "pointer-events-none"}`}>
                    <DialogTitle className="font-normal w-full flex gap-2 items-center justify-center">
                        <>
                            <div className="w-full h-10 flex items-center border rounded-md">
                                <input
                                    placeholder={title}
                                    value={editableTitle}
                                    onChange={(event: any) => setEditableTitle(event.target.value)}
                                    className="w-full h-full px-2 text-base text-slate-800 bg-transparent border-none outline-none focus:border-none focus:outline-none"
                                />
                            </div>
                            <Button
                                className="font-bold text-lg mr-4"
                                onClick={() => handleUpdate()}
                            >
                                Update
                            </Button>
                        </>
                    </DialogTitle>
                    <div className="w-full h-full">
                        <Editor
                            content={editableDescription}
                            setContent={setEditableDescription}
                        />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
