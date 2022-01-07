import React, { cloneElement, useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { useId } from 'react-id-generator'

import { Arrow, ARROW_LEFT, ARROW_RIGHT } from '../Arrow'
import { Indicator } from '../Indicator'

import styles from './Carousel.module.scss'

export const Carousel = ({ leftArrow, rightArrow, indicator, children, className, ...props }) => {
  const [widths, setWidths] = useState([])
  const [height, setHeight] = useState(0)
  const [actual, setActual] = useState(0)
  const [htmlId] = useId()

  useEffect(() => {
    setWidths(
      Array.from(document.querySelectorAll(`#${htmlId} .${styles.slide}`)).map(({ offsetWidth }) => offsetWidth)
    )
  }, [actual, setWidths])

  useEffect(() => {
    setTimeout(() => setHeight(document.getElementById(htmlId)?.offsetHeight), 300)
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
    <div className={classNames(styles.carousel, className)} {...props}>
      <div className={styles.stripe} style={stripeStyle} id={htmlId}>
        {children.map((child, i) => (
          <div key={`slide_${i}`} className={styles.slide}>
            {typeof child.type === 'function'
              ? cloneElement(child, { actual, index: i, total: children.length })
              : child}
          </div>
        ))}
      </div>
      <Indicator custom={indicator} total={children.length} actual={actual} onClick={setActual} />
      {height > 0 && actual > 0 && (
        <Arrow custom={leftArrow} type={ARROW_LEFT} onClick={handleLeftClick} style={arrowStyle} />
      )}
      {height > 0 && widths.length && actual < widths.length - 1 && (
        <Arrow custom={rightArrow} type={ARROW_RIGHT} onClick={handleRightClick} style={arrowStyle} />
      )}
    </div>
  )
}
