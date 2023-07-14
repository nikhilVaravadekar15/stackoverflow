import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import Question from "@/components/Question";

export default function Home() {

  return (
    <main className="h-screen w-screen flex flex-col">
      <Header />
      <div className="container py-1 flex flex-col gap-2 items-center justify-center">
        <div className="Questions h-full w-4/5 flex flex-col gap-1">
          <Question />
          <Question />
          <Question />
          <Question />
          <Question />
          <Question />
          <Question />
          <Question />
          <Question />
        </div>
        <div className="w-4/5 mb-2">
          <Pagination />
        </div>
      </div>
    </main >
  )
}
