import React from 'react'
import classNames from 'classnames'
import { Carousel } from '../components/Carousel'

import styles from './Carousel3DExample.module.scss'

const Slide = ({ src, actual, index }) => (
  <div className={classNames(styles.slide, { [styles.animation]: actual === index })}>
    <img src={src} />
  </div>
)

export const Carousel3DExample = ({ imagesUrls }) => (
  <Carousel className={styles.collections} indicator={null}>
    {imagesUrls.map((src, i) => (
      <Slide key={`img3d_${i}`} src={src} />
    ))}
  </Carousel>
)
