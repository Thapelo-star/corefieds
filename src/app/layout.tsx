import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Corefieds — Buy | Sell | Bid | Auction | Request',
  description: "South Africa's safest multi-vendor marketplace. Secure escrow payments, verified sellers, free listings.",
  manifest: '/manifest.json',
  themeColor: '#1a7a4a',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Corefieds',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a7a4a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Corefieds" />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
