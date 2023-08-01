import React, { useState } from 'react'
import {
    BiSolidUpArrow,
    BiSolidDownArrow
} from 'react-icons/bi'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from './ui/button'

type TVotesProps = {
    upvotes: number
    downvotes: number
}

export default function Votes({ upvotes, downvotes }: TVotesProps) {

    const [votes, setVotes] = useState<number>(upvotes - downvotes)

    return (
        <div className="flex flex-col gap-2 items-center">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" className="rounded-full hover:bg-orange-50">
                            <BiSolidUpArrow size={"1.25rem"} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span className="p-4">
                            <p>This question shows research effort,</p>
                            <p>it is useful and clear</p>
                        </span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <div className="font-bold text-xl">
                {votes}
            </div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" className="rounded-full hover:bg-orange-50">
                            <BiSolidDownArrow size={"1.25rem"} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span className="p-4">
                            <p>This question does not show any research effort,</p>
                            <p>it is unclear or not useful</p>
                        </span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}
