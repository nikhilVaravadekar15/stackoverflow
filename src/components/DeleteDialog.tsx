"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "./ui/use-toast"
import { LoadingSpinner } from "./Loader"
import { useRouter } from "next/navigation"
import { deleteAnswer, deleteQuestion } from "@/https"
import { useMutation, useQueryClient } from "@tanstack/react-query"


type TDelete = {
    id: string
    type: "question" | "answer"
}

export default function DeleteDialog({ id, type }: TDelete) {

    const router = useRouter()
    const queryClient = useQueryClient()

    const { isLoading, isError, isSuccess, mutate, data: response } = useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            if (type === "question") {
                await deleteQuestion(id)
            }
            if (type === "answer") {
                await deleteAnswer(id)
            }
        },
        onSuccess: () => {
            if (type === "question") {
                router.push("/")
            }
            if (type === "answer") {
                queryClient.invalidateQueries(["question"])
            }
        }
    })


    if (isError) {
        toast({
            variant: "destructive",
            title: "Something went wrong",
            description: `Unable to delete the ${type}, please try again.`,
            duration: 3000
        })
    }

    if (isSuccess) {
        toast({
            variant: "default",
            title: "Delete successfully",
            duration: 3000
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-transparent text-red-500 cursor-pointer hover:text-red-600 hover:bg-transparent">
                Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the {type}.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className={`${isLoading && "pointer-events-none"}`}>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            mutate({
                                id: id
                            })
                        }}
                        className="bg-red-400 hover:bg-red-500"
                    >
                        {
                            isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <span>
                                    Delete
                                </span>
                            )
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
