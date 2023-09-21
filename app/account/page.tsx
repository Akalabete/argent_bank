'use client';
import { useAppSelector } from '@/redux/hook';
import styles from './page.module.scss';
import {useRouter } from 'next/navigation';


export default function Account() {
    const username = useAppSelector((state)=> state.form.email);
    const nickname = useAppSelector((state)=> state.form.nickname);
    const router = useRouter();

    const handleEditButtonClick = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/profile');
      }
      
    return (
        <>
            <div className={styles.accountBackground}>
                <p>Welcome back <br /> {username} {nickname}</p>
                <button 
                    type="button"
                    className={styles.editButton}
                    onClick={handleEditButtonClick}
                    >Edit profile
                </button>
            </div>
            
        </>
    )
}
