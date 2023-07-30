"use client"

import { Button } from "./ui/button"

// limit: number = 10
// offset: number = 10  //(offset = (page - 1) * limit)

export default function Pagination() {
    return (
        <div className="w-full p-3 flex items-center justify-center px-2 border rounded-md hover:shadow-sm">
            <div className="w-full flex items-center justify-center">
                <div className="flex items-center space-x-1">
                    <Button className="h-8 w-8 bg-white border text-black hover:font-bold hover:bg-gray-100">
                        <span className="">1</span>
                    </Button>
                    <Button className="h-8 w-8 bg-white border text-black hover:font-bold hover:bg-gray-100">
                        <span className="">2</span>
                    </Button>
                    <Button className="h-8 w-8 bg-white border text-black hover:font-bold hover:bg-gray-100">
                        <span className="">3</span>
                    </Button>
                    <span>...</span>
                    <Button className="h-8 w-8 bg-white border text-black hover:font-bold hover:bg-gray-100">
                        <span className="">10</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
