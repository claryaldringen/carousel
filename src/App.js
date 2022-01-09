import React, { useMemo } from 'react'
import useFetch from 'react-fetch-hook'

import './App.css'
import { CollectionsExample } from './examples/CollectionsExample'
import { StoriesExample } from './examples/StoriesExample'
import { Carousel3DExample } from './examples/Carousel3DExample'

const App = () => {
  const { data: collections } = useFetch('https://web-task-api.herokuapp.com/api/v1/collections')
  const { data: stories } = useFetch('https://web-task-api.herokuapp.com/api/v1/stories')

  const collectionsImageUrl = useMemo(
    () => collections?.data.map(({ cover_image_url }) => cover_image_url),
    [collections]
  )

  const storiesImageUrl = useMemo(() => stories?.data.map(({ cover_src }) => cover_src), [stories])

  return (
    <div className="App">
      <div className="Center">
        {collectionsImageUrl && <CollectionsExample imagesUrls={collectionsImageUrl} />}
        {storiesImageUrl && <StoriesExample imagesUrls={storiesImageUrl} />}
        {collectionsImageUrl && <Carousel3DExample imagesUrls={collectionsImageUrl} />}
      </div>
    </div>
  )
}

export default App
