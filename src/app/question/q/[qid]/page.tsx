import {
    BiSolidUpArrow,
    BiSolidDownArrow
} from 'react-icons/bi'
import Header from '@/components/Header'
import Preview from '@/components/Preview'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Share from '@/components/Share'
import Comments from '@/components/Comments'
import UserAvatar from '@/components/UserAvatar'


const description: string = `
So I've been trying to figure out how can I get TS to see I'm checking my variables exist before I use them? Here's the code :

This is the function that checks

\`\`\`js
function envChecks(){
  if (!process.env.DRIVER_PATH) {
    throw new Error('Environment variable DRIVER_PATH is not set');
  }
}
\`\`\`

This is how it's used :

\`\`\`js
export async function thisDoesSomething() {

  envChecks();

  const pathToDriver = path.resolve(process.env.DRIVER_PATH); <- This Line here is give me a TS error
  // ...more code here
}
\`\`\`

This is the TS error :
\`\`\`
Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.ts(2345)
\`\`\`
If I check before the usage (not in a function), it doesn't complain then. But I prefer cleaner code.

`

export default function QuestionPage() {
    return (
        <main className="h-screen w-screen flex flex-col">
            <Header />
            <div className="container h-full py-2 flex flex-col gap-2 border rounded-md overflow-y-scroll">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold text-slate-700 cursor-pointer">
                        TypeScript is not detecting the checks before usage
                    </h1>
                    <div className="flex gap-8 items-center">
                        <div className="flex gap-1 items-center">
                            <span className="text-sm text-slate-700">Asked</span>
                            <span className="text-base text-slate-800">July 14, 2023</span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <span className="text-sm text-slate-700">Modified</span>
                            <span className="text-base text-slate-800">July 15, 2023</span>
                        </div>
                        <UserAvatar
                            image=""
                            email="elonmusk@gmail.com"
                            name="elon musk"
                        />
                        <Share url="http://localhost:3000" />
                    </div>
                </div>
                <hr />
                <div className="flex flex-col gap-12">
                    <div className="w-full flex gap-2">
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
                            <div className="font-bold text-xl">0</div>
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
                        <div className="w-full flex flex-col gap-4">
                            <Preview value={description} />
                            <Comments />
                        </div>
                    </div>
                    <hr />
                    <div className="w-full flex flex-col gap-6 mb-8">
                        <h1 className="text-3xl font-semibold text-slate-700 cursor-pointer">
                            Answers
                        </h1>
                        <div className="flex flex-col gap-12">
                            {/* # 1 */}
                            <div className="flex gap-2">
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
                                    <div className="font-bold text-xl">0</div>
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
                                <div className="w-full flex flex-col gap-4">
                                    <Preview value={description} />
                                    <Comments />
                                </div>
                            </div>
                            {/* # 2 */}
                            <div className="flex gap-2">
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
                                    <div className="font-bold text-xl">0</div>
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
                                <div className="w-full flex flex-col gap-4">
                                    <Preview value={description} />
                                    <Comments />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}
