import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Grid, Cell } from 'components/Grid'
import find from 'lodash/find'

const YouTubeEmbed = ({ video }) =>
  <div className='responsive-embed widescreen'>
    <iframe
      title={video.name || video.id || video.key}
      src={`https://www.youtube.com/embed/${video.key}`}
      frameBorder='0'
      allowFullScreen
    />
  </div>

YouTubeEmbed.propTypes = {
  video: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    key: PropTypes.string.isRequired
  }).isRequired
}

const DescriptionItem = ({ term, definition }) =>
  <Fragment>
    <dt>{term}</dt>
    <dd>{definition || 'N/A'}</dd>
  </Fragment>

DescriptionItem.propTypes = {
  term: PropTypes.string.isRequired,
  definition: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

const ShowDetailOverview = ({
  overview,
  inProduction,
  firstAirDate,
  lastAirDate,
  numberOfSeasons,
  numberOfEpisodes,
  networks,
  type,
  genres,
  homepage,
  videos,
  ...props
}) => {
  const youtubeVideo = videos && videos.length && find(videos, {
    site: 'YouTube'
  })

  return (
    <div className='show-detail-overview'>
      <Grid gutters='margin'>
        <Cell small={12} medium={7} large={9}>
          <h2>Overview</h2>
          <p>{overview || 'N/A'}</p>

          { youtubeVideo
            ? <Grid>
              <Cell
                small={12}
                large={6}
                className='large-offset-3'
              >
                <YouTubeEmbed video={videos[0]} />
              </Cell>
            </Grid>
            : null
          }
        </Cell>

        <Cell small={12} medium={5} large={3} className='detail-column'>
          <h3>Details</h3>

          <dl>
            <DescriptionItem term='Status' definition={inProduction ? 'Airing' : 'Dead'} />

            <DescriptionItem term='First Air Date' definition={firstAirDate} />
            <DescriptionItem term='Last Air Date' definition={lastAirDate} />
            <DescriptionItem term='Seasons' definition={numberOfSeasons} />
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

ShowDetailOverview.propTypes = {
  overview: PropTypes.string.isRequired,
  inProduction: PropTypes.bool.isRequired,
  firstAirDate: PropTypes.string.isRequired,
  lastAirDate: PropTypes.string.isRequired,
  numberOfSeasons: PropTypes.number.isRequired,
  numberOfEpisodes: PropTypes.number.isRequired,
  networks: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  genres: PropTypes.array,
  homepage: PropTypes.string.isRequired,
  videos: PropTypes.array
}

export default ShowDetailOverview
