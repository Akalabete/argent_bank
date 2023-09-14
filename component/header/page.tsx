import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import styles from './page.module.scss'
import Link from 'next/link';

export default function  Header() {
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
            <div className={styles.loginContainer}>
            <FontAwesomeIcon 
                size="3x" 
                icon={faCircleUser} 
            />
            <Link href="/login">
                Sign In
            </Link>
            </div>
        </header>
    )
}

