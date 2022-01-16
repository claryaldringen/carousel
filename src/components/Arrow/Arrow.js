import React, { cloneElement, isValidElement } from 'react'
import classNames from 'classnames'

import styles from './Arrow.module.scss'

export const ARROW_LEFT = 'left'
export const ARROW_RIGHT = 'right'

export const Arrow = ({ custom, type = ARROW_LEFT, onClick }) => {
  if (custom === null) return null

  if (isValidElement(custom)) {
    const handleOnClick = (e) => {
      onClick()
      custom.props.onClick && custom.props.onClick(e)
    }
    return cloneElement(custom, { onClick: handleOnClick })
  }

  return (
    <div
      onClick={onClick}
      className={classNames(styles.arrow, type === ARROW_LEFT ? styles.left : styles.right)}
      role={`${type}-arrow`}
    />
  )
}
