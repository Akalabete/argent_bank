import Image from 'next/image'
import styles from './page.module.scss'
export default function Home() {
  return (
    <>
    
    <main>
      <div className={styles.coverImageContainer}>
        <Image 
          src="/bank-tree.jpeg" 
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
/*
<main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
    */