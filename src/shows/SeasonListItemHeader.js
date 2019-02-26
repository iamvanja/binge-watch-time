import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Cell } from 'components/Grid'
import Image from 'components/Image'
import ImagePlaceholder from 'components/ImagePlaceholder'
import StarButtonSeason from 'shows/StarButtonSeason'
import Icon from 'components/Icon'
import { IMG_BASE_URL, POSTER_SIZES } from 'constants/tmdb'

const SeasonListItemHeader = props => {
  const { name, seasonNumber, airDate, posterPath, airingSeasonNumber } = props
  const shouldRenderWatchButton =
    seasonNumber !== airingSeasonNumber && props.isShowStarred

  return (
    <div className='season-list-item'>
      <Grid align='middle'>
        {shouldRenderWatchButton && (
          <Cell className='shrink'>
            <StarButtonSeason
              className='season-watch-toggle'
              seasonId={props.id}
              seasonNumber={seasonNumber}
              showId={props.showId}
            >
              <Icon icon='eye' />
            </StarButtonSeason>
          </Cell>
        )}
        <Cell className='shrink'>
          <Image
            className='poster image-holder'
            src={`${IMG_BASE_URL}/${POSTER_SIZES.thumb}${posterPath}`}
            alt={`${name} poster`}
            fallback={<ImagePlaceholder width={55} height={82} />}
          />
        </Cell>
        <Cell className='auto content'>
          <h2 className='title h3'>{name}</h2>
          <span className='episode-count subheader'>
            {props.episodeCount} episodes
          </span>
          {airDate && <span className='air-date subheader'>{airDate}</span>}
        </Cell>
      </Grid>
    </div>
  )
}

SeasonListItemHeader.propTypes = {
  name: PropTypes.string.isRequired,
  episodeCount: PropTypes.number.isRequired,
  airDate: PropTypes.string,
  posterPath: PropTypes.string,
  id: PropTypes.number.isRequired,
  showId: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  airingSeasonNumber: PropTypes.number,
  isShowStarred: PropTypes.bool
}

export default SeasonListItemHeader
