import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Stack Overflow | SignUp"
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
