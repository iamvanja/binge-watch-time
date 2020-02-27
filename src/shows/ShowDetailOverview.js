import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Cell } from 'components/Grid'
import DescriptionItem from 'components/DescriptionItem'
import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import EmbedToggle from 'components/EmbedToggle'

const ShowDetailOverview = props => {
  const {
    overview,
    status,
    firstAirDate,
    lastAirDate,
    numberOfSeasons,
    numberOfEpisodes,
    networks,
    type,
    genres,
    homepage,
    videos
  } = props

  return (
    <div className='show-detail-overview'>
      <Grid gutters='margin'>
        <Cell small={12} medium={7} large={9}>
          <h2>Overview</h2>
          <p>{overview || 'N/A'}</p>

          <Grid>
            <Cell
              small={12}
              large={6}
              className='large-offset-3'
            >
              <EmbedToggle videos={videos} />
            </Cell>
          </Grid>
        </Cell>

        <Cell small={12} medium={5} large={3} className='detail-column'>
          <h3>Details</h3>

          <dl>
            <DescriptionItem term='Status' definition={status} />

            <DescriptionItem term='First Air Date' definition={firstAirDate} />
            <DescriptionItem term='Last Air Date' definition={lastAirDate} />
            <DescriptionItem term='Seasons' definition={numberOfSeasons} />
            <DescriptionItem term='Episodes' definition={numberOfEpisodes} />
            <DescriptionItem
              term='Network'
              definition={networks.map(({ name }) => name).join(', ')}
            />
            <DescriptionItem term='Type' definition={type} />
            <DescriptionItem
              term='Genres'
              definition={genres.length && genres.map(genre =>
                <span key={genre.id} className='label secondary'>{genre.name}</span>
              )}
            />
          </dl>

          {homepage && <a href={homepage} target='_blank'>Show's homepage</a>}
        </Cell>
      </Grid>
    </div>
  )
}

ShowDetailOverview.defaultProps = {
  networks: [],
  genres: [],
  videos: []
}

ShowDetailOverview.propTypes = {
  overview: PropTypes.string.isRequired,
  status: PropTypes.string,
  firstAirDate: PropTypes.string.isRequired,
  lastAirDate: PropTypes.string.isRequired,
  numberOfSeasons: PropTypes.number.isRequired,
  numberOfEpisodes: PropTypes.number.isRequired,
  networks: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  genres: PropTypes.array,
  homepage: PropTypes.string,
  videos: PropTypes.array
}

export default connect(
  (state, ownProps) => ({
    ...selectors.shows.getShow(state, ownProps.match.params.showId)
  })
)(ShowDetailOverview)
