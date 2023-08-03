"use client"

import React from 'react'
import {
    QueryClient,
    QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function QueryClientProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <TanstackQueryClientProvider client={queryClient}>
            {children}
        </TanstackQueryClientProvider>
    )
}
