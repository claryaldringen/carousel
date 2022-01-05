import React, { cloneElement, useCallback, useEffect, useMemo, useState } from 'react'

import { Arrow, ARROW_LEFT, ARROW_RIGHT } from '../Arrow'
import styles from './Carousel.module.scss'

import { Indicator } from '../Indicator'
import classNames from 'classnames'

export const Carousel = ({ leftArrow, rightArrow, indicator, children, className }) => {
  const [widths, setWidths] = useState([])
  const [height, setHeight] = useState(0)
  const [actual, setActual] = useState(0)

  useEffect(() => {
    if (!widths.length || !widths[0]) {
      setWidths(Array.from(document.getElementsByClassName(styles.slide)).map(({ offsetWidth }) => offsetWidth))
    }
  }, [actual, setWidths])

  useEffect(() => {
    setTimeout(() => setHeight(document.getElementsByClassName(styles.stripe)[0].offsetHeight), 300)
  }, [setHeight])

  const translate = useMemo(
    () =>
      widths.reduce((acc, width, index) => {
        if (index < actual) {
          acc += width
        }
        return acc
      }, 0),
    [actual, widths]
  )

  const handleLeftClick = useCallback(() => {
    if (actual) {
      setActual(actual - 1)
    }
  }, [actual, setActual])

  const handleRightClick = useCallback(() => {
    if (widths.length && actual < widths.length - 1) {
      setActual(actual + 1)
    }
  }, [widths.length, actual, setActual])

  const stripeStyle = {
    transition: '1000ms',
    transform: `translate(-${translate}px)`
  }

  const arrowStyle = {
    top: height / 2
  }

  return (
    <div className={classNames(styles.carousel, className)}>
      <div className={styles.stripe} style={stripeStyle}>
        {children.map((child, i) => (
          <div key={`slide_${i}`} className={styles.slide}>
            {cloneElement(child, { active: i === actual })}
          </div>
        ))}
      </div>
      <Indicator custom={indicator} total={children.length} actual={actual} onClick={setActual} />
      {height && actual > 0 && (
        <Arrow custom={leftArrow} type={ARROW_LEFT} onClick={handleLeftClick} style={arrowStyle} />
      )}
      {height && widths.length && actual < widths.length - 1 && (
        <Arrow custom={rightArrow} type={ARROW_RIGHT} onClick={handleRightClick} style={arrowStyle} />
      )}
    </div>
  )
}
