import React from 'react'
import HorizontalList from 'components/HorizontalList'
import HorizontalListShowItem from 'components/HorizontalListShowItem'
import ContentBox from 'components/ContentBox'
import ContentBoxSelect from 'components/ContentBoxSelect'
import { GENRES } from 'constants/tmdb'
import api from 'api'

const DiscoverPage = () =>
  <div className='page discover'>
    <h1>Discover</h1>

    <ContentBox titleText='New'>
      <HorizontalList
        api={api.discover.showsNew}
        item={HorizontalListShowItem}
      />
    </ContentBox>

    <ContentBox titleText='Popular'>
      <HorizontalList
        api={api.discover.showsPopular}
        item={HorizontalListShowItem}
      />
    </ContentBox>

    <ContentBoxSelect
      titleText='By Genre'
      api={api.discover.showsByGenreId}
      item={HorizontalListShowItem}
      selectOptions={GENRES.map(({ id, name }) =>
        ({ value: id, label: name })
      )}
    />

  </div>

export default DiscoverPage
