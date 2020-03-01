import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Grid, Cell } from 'components/Grid'
import DescriptionItem from 'components/DescriptionItem'
import EmbedToggle from 'components/EmbedToggle'
import TrailerEmbed from '../components/TrailerEmbed'

var currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const MovieDetailOverview = props => {
  const {
    name,
    overview,
    releaseDate,
    tagline,
    status,
    genres,
    homepage,
    videos,
    imdbId,
    budget,
    revenue,
    isSpecial
  } = props
  const releaseYear = new Date(releaseDate).getFullYear()

  return (
    <div className='show-detail-overview'>
      <Grid gutters='margin'>
        <Cell small={12} medium={7} large={9}>
          <h2>{tagline || 'Overview'}</h2>
          <p>{overview || 'N/A'}</p>

          <Grid>
            <Cell
              small={12}
              large={6}
              className='large-offset-3'
            >
              <EmbedToggle videos={videos} />
              {isSpecial && <TrailerEmbed name={name} year={releaseYear} />}
            </Cell>
          </Grid>
        </Cell>

        <Cell small={12} medium={5} large={3} className='detail-column'>
          <h3>Details</h3>

          <dl>
            <DescriptionItem term='Status' definition={status} />
            <DescriptionItem term='Release Year' definition={releaseYear} />
            <DescriptionItem term='Budget' definition={budget && currencyFormatter.format(budget)} />
            <DescriptionItem term='Revenue' definition={revenue && currencyFormatter.format(revenue)} />
            <DescriptionItem
              term='Genres'
              definition={genres.length && genres.map(genre =>
                <span key={genre.id} className='label secondary'>{genre.name}</span>
              )}
            />
          </dl>

          {homepage && (
            <Fragment>
              <a href={homepage} target='_blank'>Homepage</a>
              <br />
            </Fragment>
          )}
          {imdbId && <a href={`https://www.imdb.com/title/${imdbId}/`} target='_blank'>IMDB</a>}
        </Cell>
      </Grid>
    </div>
  )
}

MovieDetailOverview.defaultProps = {
  genres: [],
  videos: []
}

MovieDetailOverview.propTypes = {
  name: PropTypes.string,
  releaseDate: PropTypes.string,
  overview: PropTypes.string,
  tagline: PropTypes.string,
  status: PropTypes.string,
  genres: PropTypes.array,
  homepage: PropTypes.string,
  videos: PropTypes.array,
  imdbId: PropTypes.string,
  budget: PropTypes.number,
  revenue: PropTypes.number,
  isSpecial: PropTypes.bool
}

export default MovieDetailOverview
