import styles from './page.module.scss'
import { useState } from "react"

export default function Form() {
  return (
    <div className={styles.form}>
        <form>
            <label>Username</label>
            <input 
                type="text"
                value=""
                name="username"
                onChange={}
            />
            <label>Password</label>
            <input type="text" />
        </form>

    </div>
  )
}
