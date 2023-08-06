/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import Image from 'next/image'
import { useEffect, useState } from "react";
import { Accordion } from "../components/ui/accordion"
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import Question from "@/components/Question";
import { Question as DBQuestions } from "@prisma/client";
import { getQuestions } from "@/https";
import { toast } from "@/components/ui/use-toast";
import Loader from '@/components/Loader';
import { useQuery, useQueryClient } from '@tanstack/react-query';


export default function Home() {

  const queryClient = useQueryClient()

  const [limit, setLimit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("desc");
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { status, data: response, error, isFetching, isPreviousData } = useQuery({
    queryKey: ['questions', limit, pageNumber, sortBy],
    queryFn: async () => await getQuestions(limit, pageNumber, sortBy, ""),
    keepPreviousData: true,
    staleTime: 5000,
  })

  // Prefetch the next page!
  useEffect(() => {
    if (!isPreviousData) {
      queryClient.prefetchQuery({
        queryKey: ['questions', limit, pageNumber, sortBy],
        queryFn: async () => await getQuestions(limit, pageNumber, sortBy, ""),
      })
    }
  }, [pageNumber, limit, sortBy, isPreviousData, queryClient])

  if (error) {
    toast({
      variant: "destructive",
      title: "Something went wrong",
      description: "Please try again.",
      duration: 3000
    })
  }

  return (
    <main className="h-screen w-screen flex flex-col">
      <Header />
      {
        isFetching || status === "loading" ? (
          <div className="absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Loader />
          </div>
        ) : (
          <div className="container h-full py-1 overflow-y-scroll">
            {
              response?.data?.data?.questions.length === 0 && (
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
              response?.data?.data?.questions.length != 0 && (
                <div className="flex flex-col gap-2 items-center justify-center">
                  <div className="mb-20 Questions h-full w-4/5 flex flex-col gap-1">
                    <Accordion type="single" collapsible className="w-full flex flex-col gap-2">
                      {
                        response?.data?.data?.questions.map((question: DBQuestions, index: number) => {
                          console.log(question)
                          return (
                            <Question key={index} question={question} />
                          )
                        })
                      }
                    </Accordion>
                  </div>
                  <div className="absolute bottom-0 mb-2 w-3/5">
                    <Pagination
                      limit={limit}
                      setLimit={setLimit}
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      sortBy={sortBy}
                      setSortBy={setSortBy}
                      totalPages={response?.data?.data?.totalPageCount}
                    />
                  </div>
                </div>
              )
            }
          </div>
        )
      }
    </main>
  )
}
