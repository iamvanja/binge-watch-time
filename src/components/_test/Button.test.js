import React from 'react'
import { shallow } from 'enzyme'
import Button from '../Button'
import Icon from '../Icon'

describe('Button', () => {
  let props
  let wrapper
  const buttonText = 'TEST'
  const component = () => {
    if (!wrapper) {
      wrapper = shallow(
        <Button {...props}>{buttonText}</Button>
      )
    }
    return wrapper
  }

  beforeEach(() => {
    props = {
      icon: undefined,
      className: undefined
    }
    wrapper = undefined
  })

  it('always renders a button', () => {
    expect(component().prop('className')).toEqual('button')
    expect(component().type()).toEqual('button')
  })

  it('renders children when passed', () => {
    expect(component().text()).toEqual(buttonText)
  })

  it('renders icon when passed', () => {
    props.icon = 'home'
    expect(component().prop('className')).toContain('icon-text')
    expect(component().find(Icon).length).toBe(1)
  })

  it('renders custom classnames', () => {
    const customClassName = 'some-custom-class another'
    props.className = customClassName
    expect(component().prop('className')).toContain(customClassName)
  })
})
