import React, { PropsWithChildren } from 'react' 
import styles from './page.module.scss';

export default function layout({
    children,
    }: PropsWithChildren<{
    params: { accountId: string }
    
    }>) {
    return <div className={styles.layoutAccountWrapper}>
        <h2>Welcome to Argent bank</h2>
        {children}
        </div>
    }
