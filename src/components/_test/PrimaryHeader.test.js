import React from 'react'
import { shallow } from 'enzyme'
import PrimaryHeader from '../PrimaryHeader'

describe('PrimaryHeader', () => {
  it('always renders PrimaryHeader', () => {
    const wrapper = shallow(
      <PrimaryHeader />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
