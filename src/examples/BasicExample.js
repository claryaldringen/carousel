import React from 'react'
import { Carousel } from '../components/Carousel'

export const BasicExample = ({ imagesUrls }) => (
  <Carousel style={{ width: 400, margin: 'auto' }}>
    {imagesUrls.map((src, i) => (
      <img key={`img_${i}`} src={src} />
    ))}
  </Carousel>
)
