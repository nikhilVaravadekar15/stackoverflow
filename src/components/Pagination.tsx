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
import {
    AiOutlineLeft,
    AiOutlineRight,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight
} from "react-icons/ai"

export default function Pagination() {
    return (
        <div className="w-full p-3 flex items-center justify-center px-2 border rounded-md hover:shadow-sm">
            <div className="w-full flex items-center justify-between">
                <div className="flex gap-2 items-center justify-center">
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {1} of {" "} {100}
                    </div>
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select
                            value={`10`}
                            onValueChange={(value) => {
                                console.log(value)
                            }}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={10} />
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
                </div>
                <div className="flex items-center space-x-1">
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                    // onClick={() => table.previousPage()}
                    // disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <AiOutlineLeft className="h-4 w-4" />
                    </Button>
                    <Button className="h-8 w-8 bg-white border text-black hover:font-bold hover:bg-gray-100">
                        <span className="">1</span>
                    </Button>
                    <Button className="h-8 w-8 bg-white border text-black hover:font-bold hover:bg-gray-100">
                        <span className="">2</span>
                    </Button>
                    <Button className="h-8 w-8 bg-white border text-black hover:font-bold hover:bg-gray-100">
                        <span className="">3</span>
                    </Button>
                    <Button className="h-8 w-8 bg-white border text-black hover:font-bold hover:bg-gray-100">
                        <span className="">4</span>
                    </Button>
                    <Button className="h-8 w-8 bg-white border text-black hover:font-bold hover:bg-gray-100">
                        <span className="">5</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                    // onClick={() => table.nextPage()}
                    // disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <AiOutlineRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
