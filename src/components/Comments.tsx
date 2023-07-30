"use client"

import React, { useState } from 'react'
import UserAvatar from './UserAvatar'
import { TUser } from '@/types/types'
import { Button } from './ui/button'
import { EditorComponent } from './Editor'


export default function Comments() {
    const [comment, setComment] = useState<string>("");

    return (
        <div className="w-full flex gap-3 flex-col justify-end">
            <div className="w-full flex gap-2 flex-col">
                <span className="font-bold text-xl">Comments</span>
                <div className="w-[94%] self-end">
                    <div className="w-full flex gap-3 flex-col">
                        <Comment
                            comment="JavaScript has no concept of interfaces, but that isn't because it is a dynamic language. It's because interfaces aren't implemented yet"
                            user={{} as TUser} />
                    </div>
                </div>

            </div>
            <div className="w-full">
                <span className="font-bold text-xl">Add your comment</span>
                <EditorComponent content={comment} setContent={setComment} />
            </div>
        </div>
    )
}

function Comment({ comment, user }: { comment: string, user: TUser }) {
    return (
        <div className="text-base text-slate-800">
            {comment}
            <div className="ml-4 inline-flex gap-4 text-sm items-center justify-center">
                <UserAvatar
                    image={user.image}
                    email={user.email}
                    name={user.name}
                />
                <span className="text-slate-800">July 14, 2023</span>
            </div>
        </div>
    )

}
