import React from 'react'
import { shallow } from 'enzyme'
import HeaderPrimary from '../HeaderPrimary'

describe('HeaderPrimary', () => {
  it('always renders HeaderPrimary', () => {
    const wrapper = shallow(
      <HeaderPrimary />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
