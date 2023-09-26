import React, { PropsWithChildren } from 'react'
import styles from './page.module.scss';

export default function layout({
    params,
    children,
    }: PropsWithChildren<{
    params: { accountId: string }
    
    }>) {
    return <div className={styles.layoutAccountWrapper}>
        <h2>Welcome back</h2>
        {children}
        </div>
    }