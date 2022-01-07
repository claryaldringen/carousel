import React from 'react'
import { Carousel } from '../components/Carousel'

import styles from './CollectionsExample.module.scss'

export const CollectionsExample = ({ imagesUrls }) => (
  <Carousel className={styles.collections}>
    {imagesUrls.map((src, i) => (
      <div key={`img_${i}`} className={styles.slide}>
        <img src={src} />
      </div>
    ))}
  </Carousel>
)
