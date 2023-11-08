'use client';

import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import styles from './page.module.scss'
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { selectGlobalUser, setUser } from '@/redux/features/globalUserSlice'; 


export default function  Header() {

    const globalUser = useAppSelector(selectGlobalUser);
    const authToken = globalUser.authToken;
    const userName = globalUser.username;
    const customId = globalUser.userId;
    const dispatch = useAppDispatch();
    
    return (
        <header>
            <nav className={styles.mainNav}>
                <Link className={styles.mainNavLogo} href="/">
                    <Image 
                        className={styles.mainNavLogoImage}
                        src="/argentBankLogo.webp"
                        alt="Argent Bank Logo"
                        style={{objectFit:"cover"}}
                        width="200"
                        height="55"
                        priority
                    />
                    <h1 className={styles.srOnly}>Argent Bank</h1>
                </Link>
                { authToken !== null ? (
                    <div>
                        <a className={styles.mainNavItem} href={`/accounts/${customId}`}>
                            <i className={styles.fa}>
                                <FontAwesomeIcon 
                                    icon={faCircleUser}
                                />
                            </i>
                        {userName}
                        </a>
                        <a  
                            className={styles.mainNavItem}
                            onClick={() => {
                                dispatch(setUser({
                                    authToken: null,
                                    email: '',
                                    username: '',
                                    lastName: '',
                                    password: '',
                                    firstName: '',
                                    userId: null
                                }));
                            }}
                            href="/"
                        >
                            <i className={styles.fa}>
                                <FontAwesomeIcon 
                                    icon={faRightFromBracket}
                                />
                            </i>
                        Sign Out
                        </a>
                        </div>
                        ):(
                        <div>
                            <a className={styles.mainNavItem} href="/login">
                                <i className={styles.fa}>
                                    <FontAwesomeIcon 
                                        icon={faCircleUser}
                                    />
                                </i>
                            Sign In
                            </a>
                            <a className={styles.mainNavItem} href="/new">
                                Register
                            </a>
                    </div>
                    )
                }
            </nav>
        </header>
    )
}

