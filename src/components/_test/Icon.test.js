import React from 'react'
import { shallow } from 'enzyme'
import Icon from '../Icon'

describe('Icon', () => {
  it('always renders an icon', () => {
    const wrapper = shallow(
      <Icon icon='home' />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
