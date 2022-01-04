import React, { cloneElement, isValidElement } from 'react'
import styles from './Indicator.module.scss'
import classNames from 'classnames'

export const Indicator = ({ custom, total, actual, onClick }) => {
  const handleOnClick = (index) => () => onClick(index)

  if (isValidElement(custom)) {
    return cloneElement(custom, { total, actual, onClick })
  }

  return (
    <div className={styles.indicator}>
      {Array(total)
        .fill()
        .map((_, i) => (
          <div
            onClick={handleOnClick(i)}
            className={classNames(styles.point, { [styles.actual]: i === actual })}
            key={`point_${i}`}
          />
        ))}
    </div>
  )
}
