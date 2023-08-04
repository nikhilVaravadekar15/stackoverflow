import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { AiOutlineShareAlt } from 'react-icons/ai'

export default function Share({ url }: { url: string }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="secondary" className="flex text-gray-700 bg-transparent items-center gap-2 justify-center hover:text-gray-800 hover:bg-transparent">
                    <span>Share</span>
                    <AiOutlineShareAlt size={"1rem"} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-semibold leading-none">Share a link to this question</h4>
                    </div>
                    <div className="w-full">
                        <input
                            type="url"
                            readOnly={true}
                            defaultValue={url}
                            className="p-2 w-full text-xs border rounded pointer-events-none"
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
