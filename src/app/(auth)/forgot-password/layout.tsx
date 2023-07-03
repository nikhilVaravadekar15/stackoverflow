import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Stack Overflow | Forgot Password"
}

export default function SignUpLayout({
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
