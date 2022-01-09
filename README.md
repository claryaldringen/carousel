# Carousel

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

**yarn**

```bash
yarn add @claryaldringen/carousel
```

**npm**

```bash
npm install @claryaldringen/carousel
```
## Getting Started

### Examples

Working examplese are [here](https://claryaldringen.github.io/carousel/).

**Simple Carousel**
```js
import React from 'react';
import { Carousel } from '@claryaldringen/carousel';

export const SimpleCarousel = () => (  
<Carousel>
    <img src="/public/images/image1.jpg" />
    <img src="/public/images/image1.jpg" />
    <img src="/public/images/image1.jpg" />
  </Carousel>
)
```

**Carousel with no indicator and no arrows**
```js
import React from 'react';
import { Carousel } from '@claryaldringen/carousel';

export const CarouselNoControls = () => (  
<Carousel indicator={null} leftArrow={null} rightArrow={null}>
    <img src="/public/images/image1.jpg" />
    <img src="/public/images/image1.jpg" />
    <img src="/public/images/image1.jpg" />
  </Carousel>
)
```

**Carousel with custom indicator and arrows**
```js
import React from 'react';
import { Carousel } from '@claryaldringen/carousel';

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

export const CarouselCustomControls = () => (
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
  >
    <img src="/public/images/image1.jpg" />
    <img src="/public/images/image1.jpg" />
    <img src="/public/images/image1.jpg" />
  </Carousel>
)
```
### Props

**Carousel**

| Name          | Args                                                                              |  Default | Description |
|---------------|-----------------------------------------------------------------------------------|----------|------------|
| leftArrow     | [React element](https://reactjs.org/docs/rendering-elements.html), null, undefined | undefined | When *null*, no left arrow is displayed. When *undefined*, the *Arrow* component from package is displayed. Otherwise the given React element is displayed.|
| rightArrow    | [React element](https://reactjs.org/docs/rendering-elements.html), null, undefined | undefined | When *null*, no right arrow is displayed. When *undefined*, the *Arrow* component from package is displayed. Otherwise the given React element is displayed.|
| indicator     | [React element](https://reactjs.org/docs/rendering-elements.html), null, undefined | undefined | When *null*, no indicator is displayed. When *undefined*, the *Indicator* component from package is displayed. Otherwise the given React component is displayed.|

Other accepted props are same like in other [DOM Elements](https://reactjs.org/docs/dom-elements.html).

**Indicator**

Indicator can have same props like any other [DOM Element](https://reactjs.org/docs/dom-elements.html), but accepts some more props from its parent Carousel:

| Name    | Args              | Description                                                                     |
|---------|-------------------|---------------------------------------------------------------------------------|
| total   | number            | Number of elements in Carousel.                                                 |
| actual  | number            | The index of active element in Carousel.                                        |
| onClick | `(index) => void` | The onClick handler which accepts index of the next actual element in Carousel. |

**Arrow**

Arrow can have same props like any other [DOM Element](https://reactjs.org/docs/dom-elements.html), but accepts some more props from its parent Carousel:
