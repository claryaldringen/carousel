import React, { cloneElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'

import { Arrow, ARROW_LEFT, ARROW_RIGHT } from '../Arrow'
import { Indicator } from '../Indicator'

import styles from './Carousel.module.scss'

export const Carousel = ({ leftArrow, rightArrow, indicator, children, className, ...props }) => {
  const [widths, setWidths] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const slidesRef = useRef([])

  useEffect(() => {
    setWidths(slidesRef.current.map(({ offsetWidth }) => offsetWidth))
  }, [activeIndex, setWidths])

  const stripeStyle = useMemo(() => {
    const translation = widths.reduce((acc, width, index) => {
      if (index < activeIndex) {
        acc += width
      }
      return acc
    }, 0)

    return {
      transition: '1000ms',
      transform: `translate(-${translation}px)`
    }
  }, [activeIndex, widths])

  const handleLeftClick = useCallback(() => {
    if (activeIndex) {
      setActiveIndex(activeIndex - 1)
    }
  }, [activeIndex, setActiveIndex])

  const handleRightClick = useCallback(() => {
    if (widths.length && activeIndex < widths.length - 1) {
      setActiveIndex(activeIndex + 1)
    }
  }, [widths.length, activeIndex, setActiveIndex])

  return (
    <div className={classNames(styles.carousel, className)} {...props}>
      <div className={styles.stripe} style={stripeStyle}>
        {children.map((child, i) => (
          <div key={`slide_${i}`} ref={(el) => (slidesRef.current[i] = el)} className={styles.slide}>
            {typeof child.type === 'function'
              ? cloneElement(child, { activeIndex, index: i, total: children.length })
              : child}
          </div>
        ))}
      </div>
      <Indicator custom={indicator} total={children.length} actual={activeIndex} onClick={setActiveIndex} />
      {activeIndex > 0 && <Arrow custom={leftArrow} type={ARROW_LEFT} onClick={handleLeftClick} />}
      {widths.length && activeIndex < widths.length - 1 && (
        <Arrow custom={rightArrow} type={ARROW_RIGHT} onClick={handleRightClick} />
      )}
    </div>
  )
}
