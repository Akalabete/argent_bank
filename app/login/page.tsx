import styles from './page.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

export default function Login() {
  return (
   
    <section className={styles.loginBackground}>
        <div className={styles.loginWindow}>
        <FontAwesomeIcon 
                size="3x" 
                icon={faCircleUser} 
            />
            <h3>Sign in</h3>
        </div>
    </section>
 
    
  )
}
