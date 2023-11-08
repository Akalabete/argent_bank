import styles from './page.module.scss'
import LandingCard from '../component/landingCards/page';
import { Key } from 'react';
import services from '../component/landingCards/services.json'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
      <div className={styles.hero}>
        <section className={styles.heroContent}>
          <h2 className={styles.srOnly}>Promoted Content</h2>
          <p className={styles.subtitle}>No fees.</p>
          <p className={styles.subtitle}>No minimum deposit.</p>
          <p className={styles.subtitle}>High interest rates.</p>
          <p className={styles.text}>Open a savings account with Argent Bank today!</p>
        </section>
        </div>
        <section className={styles.features}>
            <h2 className={styles.srOnly}>Features</h2>
            {services.map((service: any, index: Key | null | undefined) => (
              <LandingCard key={index} service={service} />     
            ))}
        </section>
      </main>
    </>
  )
}
