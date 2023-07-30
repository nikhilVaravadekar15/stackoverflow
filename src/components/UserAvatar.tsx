import React from 'react'
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from '@/components/ui/avatar'
import { TUser } from '@/types/types'

export default function UserAvatar({ image, email, name }: TUser) {
    return (
        <div className="cursor-pointer flex gap-1 items-center justify-center">
            <Avatar className="h-6 w-6 border-slate-500 rounded-full">
                <AvatarImage src={image!} alt={email?.split("@")[0]} />
                <AvatarFallback className="text-xs font-semibold text-center bg-orange-400">
                    {email?.split("@")[0].substring(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <span className="text-sm text-slate-600 hover:text-blue-600">{name!}</span>
        </div>
    )
}
