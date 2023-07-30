import React from 'react'
import Link from 'next/link'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    BiRightArrowAlt
} from 'react-icons/bi'
import { TUser } from '@/types/types'
import UserAvatar from './UserAvatar'
import LogoutDialog from './LogoutDialog'


export default function UserProfileSettings({ name, email, image }: TUser) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <UserAvatar
                    name={name}
                    email={email}
                    image={image}
                />
            </PopoverTrigger>
            <PopoverContent className="w-60">
                <div className="flex flex-col gap-2">
                    <Link
                        passHref={true}
                        href="/question-asked"
                        className="w-full p-1.5 flex items-center justify-between border rounded-md hover:bg-slate-200 focus-within:text-gray-800"
                    >
                        <span className="text-sm">Question you asked</span>
                        <BiRightArrowAlt size={"1rem"} />
                    </Link>
                    <Link
                        passHref={true}
                        href="/question-asked"
                        className="w-full p-1.5 flex items-center justify-between border rounded-md hover:bg-slate-200"
                    >
                        <span className="text-sm">Question you answered</span>
                        <BiRightArrowAlt size={"1rem"} />
                    </Link>
                    <LogoutDialog />
                </div>
            </PopoverContent>
        </Popover>
    )
}
