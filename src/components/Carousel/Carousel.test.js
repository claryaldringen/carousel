import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import { Carousel } from './Carousel'

describe('Given a Carousel component', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLDivElement.prototype, 'offsetWidth', { configurable: true, value: 100 })
  })

  it('should render Carousel with right arrow and indicator', async () => {
    const { findByRole } = render(
      <Carousel>
        <div role="A">A</div>
        <div role="B">B</div>
        <div role="C">C</div>
      </Carousel>
    )

    expect(await findByRole('right-arrow')).toBeInTheDocument()
    expect(await findByRole('indicator')).toBeInTheDocument()
    expect(await findByRole('A')).toBeInTheDocument()
    expect(await findByRole('B')).toBeInTheDocument()
    expect(await findByRole('C')).toBeInTheDocument()
  })

  it('should render Carousel without left arrow and indicator', async () => {
    const rightArrowClickMock = jest.fn()
    const { findByRole, queryByRole } = render(
      <Carousel leftArrow={null} indicator={null} rightArrow={<div onClick={rightArrowClickMock} role="right-arrow" />}>
        <div role="A">A</div>
        <div role="B">B</div>
        <div role="C">C</div>
      </Carousel>
    )

    const rightArrow = await findByRole('right-arrow')
    fireEvent.click(rightArrow)
    expect(rightArrowClickMock).toHaveBeenCalled()
    expect(queryByRole('left-arrow')).not.toBeInTheDocument()
  })

  it('should move right/left show/hide arrows', async () => {
    const { findByRole, getByRole, queryByRole } = render(
      <Carousel>
        <div role="A">A</div>
        <div role="B">B</div>
        <div role="C">C</div>
      </Carousel>
    )

    const rightArrow = await findByRole('right-arrow')
    fireEvent.click(rightArrow)
    expect(getByRole('left-arrow')).toBeInTheDocument()
    expect(getByRole('A').parentNode.parentNode.style.transform).toBe('translate(-100px)')

    fireEvent.click(rightArrow)
    expect(getByRole('A').parentNode.parentNode.style.transform).toBe('translate(-200px)')
    expect(queryByRole('right-arrow')).not.toBeInTheDocument()

    const leftArrow = getByRole('left-arrow')
    fireEvent.click(leftArrow)
    fireEvent.click(leftArrow)
    expect(queryByRole('left-arrow')).not.toBeInTheDocument()
    expect(getByRole('A').parentNode.parentNode.style.transform).toBe('translate(-0px)')
  })

  it('should be moved by indicator', () => {
    const { getByRole } = render(
      <Carousel>
        <div role="A">A</div>
        <div role="B">B</div>
        <div role="C">C</div>
      </Carousel>
    )

    fireEvent.click(getByRole('indicator').childNodes[2])
    expect(getByRole('A').parentNode.parentNode.style.transform).toBe('translate(-200px)')
  })

  it('should work with custom indicator', () => {
    const indicatorClickMock = jest.fn()

    const CustomIndicator = ({ onClick }) => <button onClick={() => onClick(2)} role="indicator" />

    const { getByRole } = render(
      <Carousel indicator={<CustomIndicator />}>
        <div role="A">A</div>
        <div role="B">B</div>
        <div role="C">C</div>
      </Carousel>
    )

    fireEvent.click(getByRole('indicator'))
    // expect(indicatorClickMock).toHaveBeenCalledWith()
    expect(getByRole('A').parentNode.parentNode.style.transform).toBe('translate(-200px)')
  })
})
