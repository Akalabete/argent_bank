import React, { PropsWithChildren } from 'react'
import styles from './page.module.scss';

export default function Layout({
    params,
    children,
    }: PropsWithChildren<{
    params: { profileId: string }
    
    }>) {
    return (
        <main className={`${styles.main} ${styles.bgDark}`}> 
            {children}
        </main>)
    }