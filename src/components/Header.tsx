/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SearchDialog from "./SearchDialog";


export default function Header() {
    return (
        <div className="bg-gray-100 w-full">
            <div className="container py-3 flex items-center justify-between">
                <Link href={"/"} className="flex gap-2 items-center">
                    <Image
                        alt="logo"
                        draggable={false}
                        width={48} height={48}
                        src={"/apple-touch-icon.png"}
                    />
                    <div className="text-lg flex gap-1">
                        <span className="font-medium">Stack</span>
                        <span className="font-bold">OverFlow</span>
                    </div>
                </Link>
                <div className="flex gap-3 items-center justify-center">
                    <SearchDialog />
                    <Link href={"/ask-a-question"} className="w-40 flex h-10 items-center justify-around bg-slate-200 border cursor-pointer shadow-md border-slate-300 rounded-full hover:border-orange-500">
                        <div className="flex items-center font-bold text-sm text-slate-600">
                            Ask a question
                        </div>
                        <div className="h-6">
                            <span className="border border-gray-400 p-0.5 rounded-sm shadow-lg">c</span>
                        </div>
                    </Link>
                </div>
                <div className="flex gap-2 items-center justify-center">
                    <Button
                        asChild
                        className="text-black bg-white border rounded-3xl shadow-md hover:text-white hover:bg-gray-800">
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button
                        asChild
                        className="text-white bg-slate-800 border rounded-3xl shadow-md hover:text-orange-500 hover:bg-gray-900">
                        <Link href="/sign-up">Sign up</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
