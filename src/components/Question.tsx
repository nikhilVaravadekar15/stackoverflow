import Link from 'next/link'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion"
import Preview from "./Preview"
import UserAvatar from "./UserAvatar"
import { Question, User } from '@prisma/client'
import { TUser } from '@/types/types'

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


export default function Question({ question }: { question: Question }) {

    return (
        <AccordionItem value={`${question.id}`}>
            <AccordionTrigger className="px-4 w-full flex gap-3 border rounded-md">
                <div className="w-[12%] flex flex-col gap-1 items-end">
                    <span className="text-base text-slate-600">0 votes</span>
                    <span className="text-base text-slate-600">0 answers</span>
                </div>
                <div className="w-[80%] flex flex-col gap-1">
                    <Link href={`/question/${question.id}`} className="text-start text-base font-medium text-blue-600 hover:text-blue-700">
                        {question.title}
                    </Link>
                    <div className="flex gap-2">
                        <UserAvatar
                            name={question?.user!.name}
                            email={question?.user!.email}
                            image={question?.user!.image}
                        />
                        <div className="text-xs flex items-center justify-center text-slate-600">
                            {question.asked.toDateString()}
                        </div>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent className="w-full border rounded-md">
                <Preview value={description} />
            </AccordionContent>
        </AccordionItem>
    )
}
