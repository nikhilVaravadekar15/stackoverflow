/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import { Accordion } from "../components/ui/accordion"
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import Question from "@/components/Question";
import { Question as DBQuestions } from "@prisma/client";
import { getQuestions } from "@/https";
import { toast } from "@/components/ui/use-toast";
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';


export type TPagination = {
  limit: number
  pageNumber: number
  sortBy: string
}

export default function Home() {

  const router = useRouter()

  const [limit, setLimit] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("desc");
  // const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<DBQuestions[]>([])
  const [totalPageCount, setTotalPageCount] = useState<number>(0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true)
        const res = await getQuestions(limit, pageNumber, sortBy, "")
        if (res.status === 200) {
          const data = res.data.data
          setQuestions(data.questions)
          setTotalPageCount(data.totalPageCount)
        } else if (res.status === 500) {
          throw new Error()
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Please try again.",
          duration: 3000
        })
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [limit, pageNumber, sortBy])

  return (
    <main className="h-screen w-screen flex flex-col">
      <Header />
      {
        loading ? (
          <div className="absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Loader />
          </div>
        ) : (
          <div className="container h-full py-1 overflow-y-scroll">
            {
              questions.length === 0 && (
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
              questions.length != 0 && (
                <div className="flex flex-col gap-2 items-center justify-center">
                  <div className="Questions h-full w-4/5 flex flex-col gap-1">
                    <Accordion type="single" collapsible className="w-full flex flex-col gap-2">
                      {
                        questions.length && questions.map((question: DBQuestions, index: number) => {
                          return (
                            <Question key={index} question={question} />
                          )
                        })
                      }
                    </Accordion>
                  </div>
                  <div className="w-4/5 mb-2">
                    <Pagination
                      limit={limit}
                      setLimit={setLimit}
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      sortBy={sortBy}
                      setSortBy={setSortBy}
                      totalPageCount={totalPageCount}
                      setTotalPageCount={setTotalPageCount}
                    />
                  </div>
                </div>
              )
            }
          </div>
        )
      }
    </main >
  )
}
