'use client';

import styles from './page.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import  Form  from '../../component/form/page'
import { useAppSelector } from '@/redux/hook';
import { selectIsConnected } from '@/redux/features/userSlice'; 

    
export default function Login() {

  const isConnected = useAppSelector(selectIsConnected);
  

  return (
    
    <section className={styles.loginBackground}>
          {isConnected ?(
            <div className={styles.loginWindow}>
              <FontAwesomeIcon 
               size="2x" 
                icon={faCircleUser} 
              />
              <h3>Edit profile</h3>
              <Form />
              
            </div>
          ):(
            <div className={styles.loginWindow}>
              <FontAwesomeIcon 
                size="2x" 
                icon={faCircleUser} 
              />
              <h3>Sign in</h3>
              <Form />
              </div>
             )}
          
          
        
    </section>
 
    
  )
}
