import Header from '@/components/Header'
import React from 'react'

export default function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="h-screen w-screen flex flex-col">
            <Header />
            {children}
        </main>
    )
}
