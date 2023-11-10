import './globals.css'
import { Providers } from "@/redux/provider";
import type { Metadata } from 'next'
import Header from '../component/header/page'
import Footer from '../component/footer/page'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import styles from './page.module.scss'

config.autoAddCss = false

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
    <html className={styles.html} lang="en">
      <body className={styles.body}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
