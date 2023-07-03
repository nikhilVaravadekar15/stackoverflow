"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AiOutlineSearch } from "react-icons/ai"


export default function SearchDialog() {
    const [searchQuery, setSearchQuery] = useState<string>("")
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
                    <div className="h-6 mr-3">
                        <span className="border p-0.5 rounded-sm shadow-lg">ctrl</span>
                        +
                        <span className="border p-0.5 rounded-sm shadow-lg">k</span>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-normal">Search</DialogTitle>
                    <div className="w-full h-16 flex items-center border rounded-md">
                        <AiOutlineSearch className="mx-2 cursor-pointer text-slate-500" size={28} />
                        <input
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(event: any) => setSearchQuery(event.target.value)}
                            className="w-full text-lg text-slate-800 border-none outline-none focus:border-none focus:outline-none"
                        />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
