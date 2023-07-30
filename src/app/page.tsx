import {
  Accordion,
} from "../components/ui/accordion"
import Image from 'next/image'
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import Question from "@/components/Question";
import questionService from "@/services/question-service";
import { Question as DBQuestions } from "@prisma/client";

export type TPagination = {
  pageSize: number
  currentPage: number
  sortBy: string
}

export default async function Home() {
  const dbQuestions: DBQuestions[] | null = await questionService.getQuestions()

  return (
    <main className="h-screen w-screen flex flex-col">
      <Header />
      <div className="container h-full py-1 overflow-y-scroll">
        {
          dbQuestions.length === 0 && (
            <div className="h-full flex gap-2 flex-col items-center justify-center">
              <Image
                src={"/stack-underflow.jpg"}
                alt="stack-underflow"
                width={256}
                height={256}
                draggable={false}
              />
              <div className="text-lg flex gap-1">
                <span className="font-medium">Stack</span>
                <span className="font-bold">Underflow</span>
              </div>
            </div>
          )
        }
        {
          dbQuestions.length != 0 && (
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="Questions h-full w-4/5 flex flex-col gap-1">
                <Accordion type="single" collapsible className="w-full flex flex-col gap-2">
                  {
                    dbQuestions.length && dbQuestions.map((question: DBQuestions, index: number) => {
                      return (
                        <Question key={index} question={question} />
                      )
                    })
                  }
                </Accordion>
              </div>
              <div className="w-4/5 mb-2">
                <Pagination />
              </div>
            </div>
          )
        }
      </div>
    </main >
  )
}
