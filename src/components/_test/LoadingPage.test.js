import React from 'react'
import { mount } from 'enzyme'
import LoaderPage from '../LoaderPage'
import Loader from '../Loader'

describe('LoaderPage', () => {
  it('renders LoaderPage', () => {
    const wrapper = mount(
      <LoaderPage />
    )

    expect(wrapper.find(Loader).length).toEqual(1)
    expect(wrapper.text()).toContain('Loading...')
  })
})
