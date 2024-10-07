import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './Carrousel.module.scss'


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
    adaptiveHeight: false,
  }

  return (
    <div className={styles.carrouselWrapper}>
      <Slider {...settings} className={styles.carrousel}>
        <div>
          <img src="/images/carrousel/carrousel01.png" alt="Carrousel Item 1" />
        </div>
        <div>
          <img src="/images/carrousel/carrousel02.png" alt="Carrousel Item 2" />
        </div>
        <div>
          <img src="/images/carrousel/carrousel03.png" alt="Carrousel Item 3" />
        </div>
        <div>
          <img src="/images/carrousel/carrousel04.png" alt="Carrousel Item 4" />
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  )
}

export default Carrousel
