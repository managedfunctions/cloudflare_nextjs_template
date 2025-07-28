import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Your App Name',
  description: 'Built with Next.js and Cloudflare Workers',
}

export default function RootLayout({
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