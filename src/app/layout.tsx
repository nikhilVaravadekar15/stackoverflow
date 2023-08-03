import './globals.css'
import { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import AuthProvider from '@/components/Providers/AuthProvider'
import QueryClientProvider from '@/components/Providers/QueryClientProvider'

export const metadata: Metadata = {
  title: "Stack Overflow",
  description: "Stack Overflow is the largest, most trusted online community for developers to learn, share their programming knowledge, and build their careers.",
  icons: [
    {
      rel: "icon",
      url: "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196"
    },
    {
      rel: "apple-touch-icon",
      url: "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a"
    },
    {
      rel: "image_src",
      url: "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a"
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <QueryClientProvider>
        <AuthProvider>
          <body>
            {children}
            <Toaster />
          </body>
        </AuthProvider>
      </QueryClientProvider>
    </html>
  )
}
