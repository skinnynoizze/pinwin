import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Carrousel.module.scss'


interface SlideData {
  image: string
  alt: string
  title: string
  description: string
  link: string
}

const Carrousel: React.FC = () => {
  const [ currentSlide, setCurrentSlide ] = useState(0)
  const [ isTransitioning, setIsTransitioning ] = useState(false)

  const slides: SlideData[] = [
    {
      image: '/images/carrousel/usa-elections.jpg',
      alt: '',
      title: 'Who Will Rule the Ice?',
      description: 'Glide into the prediction market and let your political picks soar!',
      link: '/politics/international-tournaments/2024-presidential-election-usa/1001000000001596805632',
    },
    {
      image: '/images/carrousel/carrousel05.png',
      alt: '',
      title: 'Freeze Your Competition!',
      description: 'Our odds are so good, they\'ll give you chills!',
      link: '',
    },
    {
      image: '/images/carrousel/carrousel02.png',
      alt: '',
      title: 'Cool Deals to Chill Your Wallet',
      description: 'Waddle your way to crypto riches with PinWin!',
      link: '',
    },
    {
      image: '/images/carrousel/carrousel03.png',
      alt: '',
      title: 'Ice, Ice, Baby... It\'s Winning Time!',
      description: 'Slide into victory with our frosty selection of games',
      link: '',
    },
    {
      image: '/images/carrousel/carrousel04.png',
      alt: '',
      title: 'Experience the Thrill of Winning',
      description: 'Where winning is just the tip of the iceberg!',
      link: '',
    },
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
    <div className={styles.bannerWrapper}>
      {
        slides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.bannerSlide} ${index === currentSlide ? styles.active : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <Link href={slide.link} className={styles.slideLink}>
              <div className={`${styles.slideContent} ${isTransitioning ? styles.transitioning : ''}`}>
                <h2 className={styles.slideTitle}>{slide.title}</h2>
                <p className={styles.slideDescription}>{slide.description}</p>
              </div>
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default Carrousel
