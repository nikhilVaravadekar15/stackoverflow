"use client"
import {
    AiOutlineLogout
} from "react-icons/ai"
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
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"

export default function LogoutDialog() {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="p-2.5 border border-slate-500 rounded-full cursor-pointer bg-transparent hover:bg-slate-200">
                    <AiOutlineLogout size={"1.25rem"} className="text-slate-600" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently log you out
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-400 hover:bg-red-500"
                        onClick={() => signOut()}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
