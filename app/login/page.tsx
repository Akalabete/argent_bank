import styles from './page.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import  Form  from '../../component/form/page'
export default function Login() {
  return (
   
    <section className={styles.loginBackground}>
        <div className={styles.loginWindow}>
        <FontAwesomeIcon 
                size="2x" 
                icon={faCircleUser} 
            />
            <h3>Sign in</h3>
            <Form />
        </div>
    </section>
 
    
  )
}
