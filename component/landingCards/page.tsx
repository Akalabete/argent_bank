'use client'
import styles from './page.module.scss'
import Image from 'next/image';

interface Service {
    image: {
      src: string;
      alt: string;
    };
    title: string;
    description: string;
  }
  
  interface LandingCardProps {
    service: Service;
  }

export default function LandingCard({ service }: LandingCardProps) {
    
  return (
      <div className={styles.featureItem}>             
        <Image
          src={service.image.src}
          className={styles.featureIcon}
          alt={service.image.alt}
          width="100"
          height="100"
        />           
        <h3 className={styles.featureItemTitle}>{service.title}</h3>
        <p>{service.description}</p>
      </div>
    );
  }