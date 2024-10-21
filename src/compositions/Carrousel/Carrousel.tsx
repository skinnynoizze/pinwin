import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Message } from '@locmod/intl'
import styles from './Carrousel.module.scss'
import messages from './messages'


interface SlideData {
  image: string
  alt: string
  titleKey: keyof typeof messages
  descriptionKey: keyof typeof messages
  link: string
}

interface CarrouselProps {
  isSidebarExpanded: boolean // Accept the sidebar state
}

const Carrousel: React.FC<CarrouselProps> = ({ isSidebarExpanded }) => {
  const [ currentSlide, setCurrentSlide ] = useState(0)
  const [ isTransitioning, setIsTransitioning ] = useState(false)

  const slides: SlideData[] = [
    {
      image: '/images/carrousel/3.png',
      alt: '',
      titleKey: 'whoWillRuleTheIce',
      descriptionKey: 'glideIntoPrediction',
      link: '/politics/international-tournaments/2024-presidential-election-usa/1001000000001596805632?tab=statistics',
    },
    {
      image: '/images/carrousel/2.png',
      alt: '',
      titleKey: 'contrastStats',
      descriptionKey: 'diveIntoTeamAnalytics',
      link: '/football/spain/la-liga/1001000000001598742285?tab=statistics',
    },
    {
      image: '/images/carrousel/1.png',
      alt: '',
      titleKey: 'iceIceBaby',
      descriptionKey: 'slideIntoVictory',
      link: '',
    },
    /*     {
      image: '/images/carrousel/carrousel03.png',
      alt: '',

      title: 'Cool Deals to Chill Your Wallet',
      description: 'Slide into victory with our frosty selection of games',
      description: 'Waddle your way to crypto riches with PinWin!',
      link: '',
    },
    {
      image: '/images/carrousel/carrousel04.png',
      alt: '',
      title: 'Experience the Thrill of Winning',
      description: 'Where winning is just the tip of the iceberg!',
      link: '',
    }, */
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
        setIsTransitioning(false)
      }, 500) // Half of the transition duration
    }, 10000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [ slides.length ])

  return (
    <div className={styles.bannerWrapper} style={{ height: isSidebarExpanded ? '300px' : '400px' }}>
      {
        slides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.bannerSlide} ${index === currentSlide ? styles.active : ''} ${styles[`slide${index + 1}`]}`}
          >
            <Link href={slide.link} className={styles.slideLink}>
              <div className={`${styles.slideContent} ${isTransitioning ? styles.transitioning : ''}`}>
                <h2 className={styles.slideTitle}>
                  <Message value={messages[slide.titleKey]} />
                </h2>
                <p className={styles.slideDescription}>
                  <Message value={messages[slide.descriptionKey]} />
                </p>
              </div>
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default Carrousel
