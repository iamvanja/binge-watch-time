import React from 'react'
import HorizontalList from 'components/HorizontalList'
import ContentBox from 'components/ContentBox'
import api from 'api'

const DiscoverPage = () =>
  <div className='page discover'>
    <h1>Discover</h1>

    <ContentBox titleText='New'>
      <HorizontalList api={api.discover.showsNew} />
    </ContentBox>

    <ContentBox titleText='Popular'>
      <HorizontalList api={api.discover.showsPopular} />
    </ContentBox>

  </div>

export default DiscoverPage
