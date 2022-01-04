import React, { useMemo } from 'react'
import useFetch from 'react-fetch-hook'

import './App.css'
import { Carousel } from './Carousel'

const App = () => {
  const { data } = useFetch('https://web-task-api.herokuapp.com/api/v1/collections')

  const imagesUrls = useMemo(() => data?.data.map(({ cover_image_url }) => cover_image_url), [data])

  const customLeftArrowClick = () => console.log('Left arrow clicked')

  const customLeftArrow = (
    <div onClick={customLeftArrowClick} style={{ left: 32, top: 64 }}>
      <b>&lt;</b>
    </div>
  )

  const customRightArrow = (
    <div style={{ right: 32, top: 64 }}>
      <b>&gt;</b>
    </div>
  )

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

  return (
    <div className="App">
      {imagesUrls && (
        <>
          <Carousel>
            {imagesUrls.map((src, i) => (
              <img key={`img_${i}`} src={src} width={200} />
            ))}
          </Carousel>
          <Carousel leftArrow={customLeftArrow} rightArrow={customRightArrow} indicator={<CustomIndicator />}>
            {imagesUrls.map((src, i) => (
              <img key={`img_${i}`} src={src} width={200} />
            ))}
          </Carousel>
        </>
      )}
    </div>
  )
}

export default App
