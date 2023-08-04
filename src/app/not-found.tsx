import {
    BiLeftArrowAlt,
} from 'react-icons/bi'
import Link from 'next/link'
import Error from '@/components/Error'


export default function NotFound() {
    return (
        <main className="h-screen w-screen flex  flex-col items-center justify-center">
            <Error />
            <div className="mt-4 flex items-center justify-center gap-x-3">
                <Link
                    href={"/"}
                    passHref={true}
                    className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black bg-slate-200 hover:bg-white"
                >
                    <BiLeftArrowAlt size={16} className="mr-2" />
                    Go back
                </Link>
            </div>
        </main>
    )
}
