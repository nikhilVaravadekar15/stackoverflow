"use client"

import {
    AiOutlineSearch
} from "react-icons/ai"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "./ui/use-toast"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"


export default function SearchModal() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [searchQuery, setSearchQuery] = useState<string>("")

    function handleSearch() {
        if (searchQuery.trim() === "") {
            toast({
                variant: "destructive",
                title: "Search cannot be empty",
                duration: 3000
            })
        } else {
            router.push(`/?search=${searchQuery}`)
            queryClient.invalidateQueries(["questions"])
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="border-none outline-none">
                <div className="w-60 flex h-10 items-center justify-between bg-white border cursor-pointer shadow-md border-slate-300 rounded-full hover:border-orange-500">
                    <div className="flex items-center">
                        <AiOutlineSearch className="ml-2 text-slate-500" size={20} />
                        <div className="text-sm text-slate-500">
                            Search...
                        </div>
                    </div>
                    {/* <div className="h-6 mr-3">
                        <span className="border p-0.5 rounded-sm shadow-lg">ctrl</span>
                        +
                        <span className="border p-0.5 rounded-sm shadow-lg">k</span>
                    </div> */}
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle className="font-normal">Search</DialogTitle>
                    <div className="relative w-full h-16 flex items-center border rounded-md">
                        <div className="flex items-center">
                            <input
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(event: any) => {
                                    setSearchQuery(event.target.value)
                                }}
                                className="w-full px-2 text-lg text-slate-800 bg-transparent border-none outline-none focus:border-none focus:outline-none"
                            />
                        </div>
                        <AiOutlineSearch
                            onClick={() => handleSearch()}
                            className="absolute p-2 h-10 w-10 right-1 border rounded-full bg-slate-100 cursor-pointer hover:bg-slate-200 hover:shadow-md"
                        />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
