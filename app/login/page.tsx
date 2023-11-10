'use client';

import styles from './page.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import  Form  from '../../component/form/page'

export default function Login() {
  return (
    <section className={styles.signInContent}>   
        <i className={`${styles.signInIcon}, ${styles.fa}`}>
          <FontAwesomeIcon 
            
            icon={faCircleUser} 
          />
        </i>
        <h1>Sign in</h1>
        <Form />  
    </section>
  )
}


