import React, { PropsWithChildren } from 'react' 
import styles from './page.module.scss';

export default function layout({
    children,
    }: PropsWithChildren<{
    params: { accountId: string }
    
    }>) {
    return (
        <main className={`${styles.main} ${styles.bgDark}`}> 
            {children}
        </main>)
    }
