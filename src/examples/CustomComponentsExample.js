import React from 'react'
import { Carousel } from '../components/Carousel'

const CustomIndicator = ({ total, actual, onClick }) => (
  <div>
    {Array(total)
      .fill()
      .map((_, i) => (
        <span onClick={() => onClick(i)} key={`ci_${i}`}>
          &nbsp;
          {i === actual ? <b>{i + 1}</b> : i + 1}
          &nbsp;
        </span>
      ))}
  </div>
)

export const CustomComponentsExample = ({ imagesUrls }) => (
  <Carousel
    leftArrow={
      <div onClick={() => console.log('Left arrow click!')} style={{ position: 'absolute', left: 8, top: 200 }}>
        <b>&lt;</b>
      </div>
    }
    rightArrow={
      <div
        onClick={() => console.log('Right arrow click!')}
        style={{ position: 'absolute', right: 8, top: 200, zIndex: 3 }}>
        <b>&gt;</b>
      </div>
    }
    indicator={<CustomIndicator />}
    style={{ width: 400, margin: 'auto' }}>
    {imagesUrls.map((src, i) => (
      <img key={`img_${i}`} src={src} width={400} />
    ))}
  </Carousel>
)
