"use client"

import React, { useEffect } from 'react'
import {
    FcGoogle
} from 'react-icons/fc'
import {
    AiOutlineGithub
} from 'react-icons/ai'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'
import { toast } from './ui/use-toast'
import { useSearchParams } from "next/navigation"

export default function AuthModal() {
    const searchParams = useSearchParams()

    async function handleOAuth(provider: string) {
        try {
            signIn(
                provider,
                {
                    callbackUrl: process.env.NEXT_PUBLIC_BASE_URL!
                }
            )
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: `There was a problem signing-in with ${provider}, Please try again later.`,
                duration: 3000
            })
        }
    }

    useEffect(() => {
        const error: string = searchParams.get("error")!
        if (error === "OAuthAccountNotLinked") {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong. OAuthAccountNotLinked",
                description: "To confirm your identity, sign in with the same account you used originally",
            })
        }

    }, [])

    return (
        <Dialog>
            <DialogTrigger className="border-none outline-none">
                <Button
                    asChild
                    className="text-white font-bold bg-slate-800 border rounded-3xl shadow-md cursor-pointer hover:text-orange-500 hover:bg-gray-900">
                    <span>Get Started</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-normal">
                        <h2 className="text-center text-xl font-semibold leading-tight text-slate-800">
                            Sign in to get started
                        </h2>
                    </DialogTitle>
                    <DialogDescription>
                        <div className="py-12 flex flex-col gap-3 xl:mx-auto xl:max-w-sm">
                            <div className="text-center text-base text-gray-600">
                                By continuing, you are setting up a
                                <span className="mx-1 font-semibold inline-flex gap-1 cursor-pointer text-orange-500 hover:text-orange-700">
                                    Stack OverFlow
                                </span>
                                account and agree to our
                                <span className="mx-1 inline-flex gap-1 cursor-pointer text-blue-500 hover:text-blue-700">
                                    User Agreement
                                </span>
                                and
                                <span className="mx-1 inline-flex gap-1 cursor-pointer text-blue-500 hover:text-blue-700">
                                    Privacy Policy
                                </span>
                            </div>
                            <div className="mt-3 space-y-3">
                                <Button
                                    asChild
                                    type="button"
                                    onClick={() => handleOAuth("google")}
                                    className="w-full flex gap-2 items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 cursor-pointer hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                                >
                                    <div>
                                        <FcGoogle size={24} />
                                        <span>Sign up with Google</span>
                                    </div>
                                </Button>
                                <Button
                                    asChild
                                    type="button"
                                    onClick={() => handleOAuth("github")}
                                    className="w-full flex gap-2 items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 cursor-pointer hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                                >
                                    <div>
                                        <AiOutlineGithub size={24} />
                                        <span>Sign up with Github</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
