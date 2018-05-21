import React from 'react'
import { GridContainer } from 'components/Grid'
import HorizontalListShowItem from 'components/HorizontalListShowItem'
import ContentBox from 'components/ContentBox'
import { DiscoverNew, DiscoverPopular, DiscoverByGenre } from './ConnectedLists'

const DiscoverPage = () =>
  <div className='page discover'>
    <GridContainer>
      <h1>Discover</h1>

      <ContentBox titleText='New'>
        <DiscoverNew item={HorizontalListShowItem} />
      </ContentBox>

      <ContentBox titleText='Popular'>
        <DiscoverPopular item={HorizontalListShowItem} />
      </ContentBox>

      <DiscoverByGenre
        titleText='By Genre'
        item={HorizontalListShowItem}
      />
    </GridContainer>
  </div>

export default DiscoverPage
