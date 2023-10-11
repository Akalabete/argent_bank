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
                        src="/argentBankLogo.avif" 
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
                            size="xl" 
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
                ):( <>
                    
                    <div className={styles.loginContainer}>
                    <div className={styles.loginFont}>

                    <FontAwesomeIcon 
                        size="2x" 
                        icon={faCircleUser} 
                    />
                    </div>
                    <Link href="/login">
                    Sign&thinsp;in
                    </Link>
                    <Link href="/new">
                        Register
                    </Link>
                    </div>
                    </>
                )}
            
            
            
        </header>
    )
}

