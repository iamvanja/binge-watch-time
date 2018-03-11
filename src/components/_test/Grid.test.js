import React from 'react'
import { shallow } from 'enzyme'
import { GridContainer, Grid, Cell } from '../Grid'

describe('GridContainer', () => {
  it('always renders a GridContainer', () => {
    const wrapper = shallow(
      <GridContainer>children</GridContainer>
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('always renders a GridContainer with props', () => {
    const wrapper = shallow(
      <GridContainer fluid full>children</GridContainer>
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Grid', () => {
  it('always renders a Grid', () => {
    const wrapper = shallow(
      <Grid vertical gutters='padding' align='middle'>
        <Cell>cell</Cell>
      </Grid>
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Cell', () => {
  it('always renders a Cell', () => {
    const wrapper = shallow(
      <Cell small={12} medium={6} alignSelf='top'>cell</Cell>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
