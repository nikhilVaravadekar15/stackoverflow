/* eslint-disable @next/next/link-passhref */
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BiRightArrowAlt } from 'react-icons/bi';


export default function SignUp() {
    return (
        <>
            <div className="h-screen w-screen flex flex-col items-center justify-center">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <div className="mb-2 flex justify-center">
                        <Link href={"/"} className="flex gap-2 items-center">
                            <Image
                                src={"/apple-touch-icon.png"}
                                alt="logo"
                                draggable={false}
                                width={48} height={48}
                            />
                            <div className="font-bold flex gap-1">
                                <span>Stack</span>
                                <span>OverFlow</span>
                            </div>
                        </Link>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Forgot password
                    </h2>
                    <p className="mt-2 text-center flex gap-1 items-center justify-center text-base text-gray-600">
                        {"Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it."}
                    </p>
                    <form action="#" method="POST" className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="email" className="text-base font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="off"
                                        placeholder="Email"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="w-full flex gap-2 items-center justify-center text-white rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 hover:text-orange-500"
                                >
                                    <span>Reset my password</span>
                                    <BiRightArrowAlt size={20} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
