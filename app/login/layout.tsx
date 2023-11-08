import styles from './page.module.scss'

export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
        <main className={`${styles.main} ${styles.bgDark}`}> 
            {children}
           
        </main>
        </>
    )
  }