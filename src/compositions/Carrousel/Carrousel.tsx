import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './Carrousel.module.scss'

// Add this interface for slide data
interface SlideData {
  image: string
  alt: string
  title: string
  description: string
}

const Carrousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,
    variableWidth: false,
    adaptiveHeight: true,
  }

  // Add this array of slide data
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

  return (
    <div className={styles.carrouselWrapper}>
      <Slider {...settings} className={styles.carrousel}>
        {
          slides.map((slide, index) => (
            <div key={index}>
              <img src={slide.image} alt={slide.alt} />
              <div className={styles.slideContent}>
                <h2 className={styles.slideTitle}>{slide.title}</h2>
                <p className={styles.slideDescription}>{slide.description}</p>
              </div>
            </div>
          ))
        }
      </Slider>
    </div>
  )
}

export default Carrousel
