import Link from 'next/link'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"


export default function Question() {
    return (
        <div className="p-4 w-full flex gap-3 border rounded-md hover:shadow-sm">
            <div className="w-[12%] flex flex-col gap-1 items-end">
                <span className="text-base text-slate-600">0 votes</span>
                <span className="text-base text-slate-600">0 answers</span>
            </div>
            <div className="w-[80%] flex flex-col gap-1">
                <div className="w-full">
                    <Link href={"/"} className="text-start text-base font-medium text-blue-600 hover:text-blue-700">
                        What does disk I/O mean in Spark?
                    </Link>
                    <div className="text-ellipsis text-slate-600 text-sm">
                        {`My question is pure theoretical regarding the Spark and MapReduce processing. 
                            What does disk I/O mean in context of Mapreduce and Spark?
                            I know that in the Spark the data is stored all over memory (RAM) during the computation.`}
                        ...
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="cursor-pointer flex gap-1 items-center justify-center">
                        <Avatar className="h-6 w-6 border-slate-500 rounded-full">
                            <AvatarImage src="" alt="" />
                            <AvatarFallback className="text-xs font-semibold text-center bg-orange-400">NV</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-slate-600 hover:text-blue-600">Nikhil Varavadelar</span>
                    </div>
                    <div className="text-xs flex items-center justify-center text-slate-600">
                        July 14, 2023
                    </div>
                </div>
            </div>
        </div>
    )
}
