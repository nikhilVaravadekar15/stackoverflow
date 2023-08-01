"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button"
import { Dispatch, SetStateAction } from "react"

type TPaginationProps = {
    limit: number
    setLimit: Dispatch<SetStateAction<number>>
    pageNumber: number
    setPageNumber: Dispatch<SetStateAction<number>>
    sortBy: string
    setSortBy: Dispatch<SetStateAction<string>>
    totalPageCount: number
    setTotalPageCount: Dispatch<SetStateAction<number>>
}

export default function Pagination({
    limit, setLimit, pageNumber, setPageNumber, sortBy, setSortBy, totalPageCount, setTotalPageCount
}: TPaginationProps) {
    return (
        <div className="w-full p-3 flex items-center justify-center px-2 border rounded-md hover:shadow-sm">
            <div className="w-full flex items-center justify-between">
                <div className="flex gap-2 items-center justify-center">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select
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
                    {
                        Array.apply(null, Array(totalPageCount)).slice(0, 4).map((_, index) => {
                            return (
                                <Button
                                    key={index}
                                    className="h-8 w-8 bg-white border text-black hover:font-bold hover:bg-gray-100"
                                >
                                    <span className="">{index + 1}</span>
                                </Button>
                            )
                        })
                    }
                    {
                        totalPageCount > 10 && (
                            <>
                                <span>...</span>
                                <Button className="h-8 w-8 bg-white border text-black hover:font-bold hover:bg-gray-100">
                                    <span className="">{totalPageCount}</span>
                                </Button>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
