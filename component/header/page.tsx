'use client';

import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import styles from './page.module.scss'
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { selectGlobalUser, setUser } from '@/redux/features/globalUserSlice'; 
import { useRouter } from 'next/navigation';

export default function  Header() {

    const globalUser = useAppSelector(selectGlobalUser);
    const userName = globalUser.userName;
    const customId = globalUser.userId;
    const dispatch = useAppDispatch();
    const router = useRouter();
    const redirectToLanding = () => {
    dispatch(setUser({
        authToken: null,
        email: '',
        userName: '',
        lastName: '',
        password: '',
        firstName: '',
        userId: null
        })
    );
    router.push('/');
    }
    return (
        
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
                { userName === "" ? (
                    <div>
                    <a className={styles.mainNavItem} 
                    onClick={()=>
                        router.push('/login')
                    }>
                        <i className={styles.fa}>
                            <FontAwesomeIcon 
                                icon={faCircleUser}
                            />
                        </i>
                    Sign In
                    </a>
                    <a className={styles.mainNavItem}
                    onClick={()=>
                        router.push('/new')
                    }>
                    
                        Register
                    </a>
            </div>
                        ):(
                            <div>
                        <a className={styles.mainNavItem} 
                        onClick={()=>
                            router.push(`/profile/${customId}`)
                            }>
                            <i className={styles.fa}>
                                <FontAwesomeIcon 
                                    icon={faCircleUser}
                                />
                            </i>
                        {userName}
                        </a>
                        <a  
                            className={styles.mainNavItem}
                            onClick={redirectToLanding}
                        >
                            <i className={styles.fa}>
                                <FontAwesomeIcon 
                                    icon={faRightFromBracket}
                                />
                            </i>
                        Sign Out
                        </a>
                        </div>
                        
                    )
                }
            </nav>
        
    )
}

