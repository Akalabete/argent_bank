import Image from 'next/image'
import styles from './page.module.scss'

export default function Home() {
  return (
    <>
      <main>
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
        <section className={styles.servicesWrapper}>
            <div className={styles.service}>
              <div className={styles.serviceLogoWrapper}>
                <Image
                  src="/icon-chat.png"
                  className={styles.serviceLogo}
                  alt=""
                  width="100"
                  height="100"
                />
              </div>
              <h3>You are our #1 priority</h3>
              <p> Need to talk to a representative? You can get in
              touch through our 24/7 chat or through a phone
              call in less than 5 minutes.</p>
            </div>
            <div className={styles.service}>
              <div className={styles.serviceLogoWrapper}>
                <Image
                  src="/icon-money.png"
                  className={styles.serviceLogo}
                  alt=""
                  width="100"
                  height="100"
                />              
              </div>
              <h3>More savings means higher rates</h3>
              <p>The more you save with us, the higher your
              interest rate will be!</p>
            </div>
            <div className={styles.service}>
              <div className={styles.serviceLogoWrapper}>
                <Image
                  src="/icon-security.png"
                  className={styles.serviceLogo}
                  alt=""
                  width="100"
                  height="100"
                />
              </div>
              <h3>Security you can trust</h3>
              <p>We use top of the line encryption to make sure
              your data and money is always safe.</p>
            </div>
        </section>
      </main>
    </>
  )
}
