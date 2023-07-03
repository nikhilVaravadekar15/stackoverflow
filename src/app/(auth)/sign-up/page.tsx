/* eslint-disable @next/next/link-passhref */
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineGithub } from 'react-icons/ai';
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
                        Sign up to create account
                    </h2>
                    <p className="mt-2 text-center flex gap-1 items-center justify-center text-base text-gray-600">
                        Already have an account?
                        <a
                            href="/login"
                            className="font-medium text-black transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </a>
                    </p>
                    <form action="#" method="POST" className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="name" className="text-base font-medium text-gray-900">
                                    Full Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Full Name"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                            </div>
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
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-base font-medium text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        type="password"
                                        autoComplete="off"
                                        placeholder="Password"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="w-full flex gap-2 items-center justify-center text-white rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 hover:text-orange-500"
                                >
                                    <span>Create Account</span>
                                    <BiRightArrowAlt size={20} />
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-3 space-y-3">
                        <button
                            type="button"
                            className="w-full flex gap-2 items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                        >

                            <FcGoogle size={24} />
                            <span>Sign up with Google</span>
                        </button>
                        <button
                            type="button"
                            className="w-full flex gap-2 items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                        >
                            <AiOutlineGithub size={24} />
                            <span>Sign up with Github</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
