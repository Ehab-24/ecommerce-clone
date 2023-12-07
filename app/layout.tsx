import './globals.css'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { cn } from "@/lib/utils"
import Dashboard from '@/components/Dashboard'

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Shopify',
  description: 'Shopify NEXT App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
     <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {
          <>
            <Toaster />
            <Dashboard>
              {children}
            </Dashboard>
          </>
        }
      </body>
    </html>
  )
}
