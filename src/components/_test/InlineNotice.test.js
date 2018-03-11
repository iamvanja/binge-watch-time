import React from 'react'
import { shallow } from 'enzyme'
import InlineNotice from '../InlineNotice'

describe('InlineNotice', () => {
  let props
  let wrapper
  let children
  const component = () => {
    if (!wrapper) {
      wrapper = shallow(
        <InlineNotice {...props}>{children}</InlineNotice>
      )
    }
    return wrapper
  }

  beforeEach(() => {
    props = {
      type: undefined,
      size: undefined,
      active: undefined
    }
    wrapper = undefined
    children = 'TEST'
  })

  it('renders an InlineNotice', () => {
    expect(component()).toMatchSnapshot()
  })

  it('renders a primary InlineNotice', () => {
    props.type = 'primary'
    expect(component()).toMatchSnapshot()
  })

  it('renders a small InlineNotice', () => {
    props.size = 'small'
    expect(component()).toMatchSnapshot()
  })

  it('does not render when no children passed', () => {
    children = null
    expect(component().html()).toEqual(null)
  })

  it('does not render when inactive', () => {
    props.active = false
    expect(component().html()).toEqual(null)
  })
})
