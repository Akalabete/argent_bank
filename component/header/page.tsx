'use client';

import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import styles from './page.module.scss'
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { setConnected, selectIsConnected } from '@/redux/features/userSlice'; 
export default function  Header() {
    const isConnected = useAppSelector(selectIsConnected);
    const dispatch = useAppDispatch();
      return (
        <header className={styles.header}>
            <div className={styles.imageWrapper}>
                <Link href="/">
                    <Image 
                        src="/argentBankLogo.png" 
                        className="App-logo"
                        alt="Argent Bank logo"
                        style={{objectFit:"cover"}}
                        fill
                        priority
                    />
                </Link>
            </div>
            
                
                { isConnected ?(
                    <div className={styles.loginContainer}>
                    <Link href="/login">
                        <FontAwesomeIcon 
                            size="3x" 
                            icon={faCircleUser} 
                         />
                    </Link>
                   
                    <Link href="/" onClick={() =>{
                        dispatch(setConnected(false)); 
                        sessionStorage.removeItem("userData"); 
                        sessionStorage.removeItem("profile");
                    }}> 
                    Sign out 
                    </Link>
                    </div>
                ):(
                    <div className={styles.loginContainer}>
                    
                        <FontAwesomeIcon 
                            size="3x" 
                            icon={faCircleUser} 
                         />
                    
                    <Link href="/login">
                    Sign in
                    </Link>
                    <Link href="/accounts/new">
                        Register
                    </Link>
                    </div>
                )}
            
            
            
        </header>
    )
}

