import React, { useState, useEffect } from 'react'
import styles from './Carrousel.module.scss'


interface SlideData {
  image: string
  alt: string
  title: string
  description: string
}

const Carrousel: React.FC = () => {
  const [ currentSlide, setCurrentSlide ] = useState(0)
  const [ isTransitioning, setIsTransitioning ] = useState(false)

  const slides: SlideData[] = [
    {
      image: '/images/carrousel/carrousel01.png',
      alt: '',
      title: 'Freeze Your Competition!',
      description: 'Our odds are so good, they\'ll give you chills!',
    },
    {
      image: '/images/carrousel/carrousel02.png',
      alt: '',
      title: 'Cool Deals to Chill Your Wallet',
      description: 'Waddle your way to crypto riches with PinWin!',
    },
    {
      image: '/images/carrousel/carrousel03.png',
      alt: '',
      title: 'Ice, Ice, Baby... It\'s Winning Time!',
      description: 'Slide into victory with our frosty selection of games',
    },
    {
      image: '/images/carrousel/carrousel04.png',
      alt: '',
      title: 'Experience the Thrill of Winning',
      description: 'Where winning is just the tip of the iceberg!',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
        setIsTransitioning(false)
      }, 500) // Half of the transition duration
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [ slides.length ])

  return (
    <div className={styles.bannerWrapper}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.bannerSlide} ${index === currentSlide ? styles.active : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className={`${styles.slideContent} ${isTransitioning ? styles.transitioning : ''}`}>
            <h2 className={styles.slideTitle}>{slide.title}</h2>
            <p className={styles.slideDescription}>{slide.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Carrousel
