"use client"

import {
    BiLeftArrowAlt,
    BiRightArrowAlt
} from 'react-icons/bi'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "./ui/button"
import { Dispatch, SetStateAction } from "react"

type TPaginationProps = {
    limit: number
    setLimit: Dispatch<SetStateAction<number>>
    pageNumber: number
    setPageNumber: Dispatch<SetStateAction<number>>
    sortBy: string
    setSortBy: Dispatch<SetStateAction<string>>
    totalPages: number
}

export default function Pagination({
    limit, setLimit, pageNumber, setPageNumber, sortBy, setSortBy, totalPages
}: TPaginationProps) {
    return (
        <div className="w-full p-3 flex items-center justify-center px-2 border rounded-md hover:shadow-sm">
            <div className="w-full flex items-center justify-between">
                <div className="flex gap-2 items-center justify-center">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select
                            disabled={pageNumber === totalPages}
                            value={`${limit}`}
                            onValueChange={(value) => setLimit(parseInt(value))}
                        >
                            <SelectTrigger className="h-8 w-[80px]">
                                <SelectValue placeholder={limit} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {
                                    [10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                            {pageSize}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Sort</p>
                        <Select
                            value={`${sortBy}`}
                            onValueChange={(value) => setSortBy(value)}
                        >
                            <SelectTrigger className="h-8 w-[96px]">
                                <SelectValue placeholder={sortBy} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {
                                    ["desc", "asc"].map((pageSize) => (
                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                            {pageSize}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    disabled={pageNumber === 1}
                                    className="text-slate-800 hover:text-black"
                                    onClick={() => setPageNumber((old: number) => Math.max(old - 1, 0))}
                                >
                                    <BiLeftArrowAlt size={"1.25rem"} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="p-2">Previous Page</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    disabled={pageNumber === totalPages}
                                    className="text-slate-800 hover:text-black"
                                    onClick={() => setPageNumber((old: number) => Math.min(old + 1, totalPages))}
                                >
                                    <BiRightArrowAlt size={"1.25rem"} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="p-2">Next Page</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}
