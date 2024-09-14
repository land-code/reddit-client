import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Reddit Client - Privacy-first Reddit client',
  description:
    "A simple, privacy-first, and open-source Reddit client that allows users to view multiple subreddits in separate, customizable lanes. Fetches data directly from Reddit's JSON feed without tracking or third-party analytics, ensuring user privacy. "
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='dark h-full min-h-screen bg-background font-sans text-foreground antialiased'>
        {children}
      </body>
    </html>
  )
}
