import Image from 'next/image'
import styles from './page.module.scss'
import LandingCard from '../component/landingCards/page';
import { Key } from 'react';
import services from '../component/landingCards/services.json'

export default function Home() {
  return (
    <>
      <main>
        <section>
          <div className={styles.coverImageContainer}>
            <Image 
              src="/bank-tree.avif" 
              className={styles.coverImage}
              alt="Arbre qui pousse dans un pot de pièces"
              fill
              style={{objectFit:"cover",objectPosition:"center left"  }}
              priority
            />
            <div className={styles.hookContainer}>
              <div className={styles.hookContent}>
                <h3>No fees.</h3>
                <h3>No minimum deposit.</h3>
                <h3>High interest rates.</h3>
                <p>Open a savings account with</p>
                <p>Argent Bank today!</p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.servicesWrapper}>
          
            {services.map((service: any, index: Key | null | undefined) => (
              <LandingCard key={index} service={service} />     
            ))}
          
        </section>
      </main>
    </>
  )
}
