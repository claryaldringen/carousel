import React from 'react'
import { Carousel } from '../components/Carousel'

import styles from './StoriesExample.module.scss'

export const StoriesExample = ({ imagesUrls }) => (
  <Carousel className={styles.collections} indicator={null}>
    {imagesUrls.map((src, i) => (
      <div key={`img_${i}`} className={styles.slide}>
        <img src={src} />
      </div>
    ))}
  </Carousel>
)
