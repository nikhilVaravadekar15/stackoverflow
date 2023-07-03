import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Stack Overflow | Login"
}

export default function SignInLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
