import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Live News',
  description: 'create live news app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-gray-100 transition-all duration-700'>
        <Header/>
        <div
        className='max-w-6xl mx-auto '>{children}</div>
        </body>
    </html>
  )
}
