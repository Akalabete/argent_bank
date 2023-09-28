import React, { PropsWithChildren } from 'react'
import styles from './page.module.scss';

export default function layout({
    params,
    children,
    }: PropsWithChildren<{
    params: { accountId: string }
    
    }>) {
    return <div className={styles.layoutAccountWrapper}>
        <h2>Profile Edition</h2>
        {children}
        </div>
    }