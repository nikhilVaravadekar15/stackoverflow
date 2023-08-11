import Link from 'next/link'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion"
import Preview from "./Preview"
import UserAvatar from "./UserAvatar"
import { Question } from '@prisma/client'
import { months } from '@/data'


export default function Question({ question }: { question: Question | any }) {

    return (
        <AccordionItem value={`${question.id}`}>
            <AccordionTrigger
                disabled={question.description ? false : true}
                className="px-4 w-full flex gap-3 border rounded-md data-[state=open]:shadow-lg"
            >
                <div className="w-[12%] flex flex-col gap-1 items-end">
                    <span className="text-base text-slate-600">0 votes</span>
                    <span className="text-base text-slate-600">0 answers</span>
                </div>
                <div className="w-[80%] flex flex-col gap-1">
                    <Link href={`/question/q/${question.id}`} className="text-start text-base font-medium text-blue-600 hover:text-blue-700">
                        {question.title}
                    </Link>
                    <div className="flex gap-2">
                        <UserAvatar
                            name={question?.user!.name}
                            email={question?.user!.email}
                            image={question?.user!.image}
                        />
                        <div className="text-xs flex items-center justify-center text-slate-600">
                            {`${months[new Date(question?.asked.toString()!).getMonth()]} ${new Date(question?.asked.toString()!).getDate()}, ${new Date(question?.asked.toString()!).getFullYear()}`}
                        </div>
                    </div>
                </div>
            </AccordionTrigger>
            {
                question.description! && (
                    <AccordionContent className="w-full border rounded-md">
                        <Preview value={question.description!} />
                    </AccordionContent>
                )
            }
        </AccordionItem>
    )
}
