import './globals.css'
import { Providers } from "@/redux/provider";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import Header from '../component/header/page'
import Footer from '../component/footer/page'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Argent Bank',
  description: 'Project 11',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
