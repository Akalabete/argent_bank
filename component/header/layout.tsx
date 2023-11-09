import styles from './page.module.scss'
import React, { PropsWithChildren } from 'react'

export default function LoginLayout({
    children,
    }: PropsWithChildren<{
    params: { accountId: string }
    }>) {
    return (
        <>
        <header> 
            {children}
        </header>
        </>
    )
  }