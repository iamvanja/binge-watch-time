import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Icon from 'components/Icon'
import { Grid, Cell } from 'components/Grid'
import { padSeasonEpisode } from 'utils/string'
import StarButtonEpisode from './StarButtonEpisode'
import isInTheFuture from './utils/isInTheFuture'

const EpisodeListItem = ({
  link,
  name,
  showId,
  episodeId,
  seasonNumber,
  episodeNumber,
  firstAired,
  showWatchButton
}) => (
  <div className='episode-list-item'>
    <Grid gutters='padding' align='middle'>
      <Cell className='shrink'>
        <Link to={link}>
          <span>
            {padSeasonEpisode(episodeNumber)}
          </span>
        </Link>
      </Cell>
      <Cell className='auto'>
        <Link to={link}>
          <h3 className='h4 episode-name'>{name}</h3>
          {firstAired && <span className='subheader'>{firstAired}</span>}
        </Link>
      </Cell>
      {showWatchButton && !isInTheFuture(firstAired) && (
        <Cell className='shrink'>
          <StarButtonEpisode
            className='episode-watch-toggle'
            episodeId={episodeId}
            seasonNumber={seasonNumber}
            episodeNumber={episodeNumber}
            showId={showId}
          >
            <Icon icon='eye' />
          </StarButtonEpisode>
        </Cell>
      )}
    </Grid>
  </div>
)

EpisodeListItem.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  showId: PropTypes.number.isRequired,
  episodeId: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  episodeNumber: PropTypes.number.isRequired,
  firstAired: PropTypes.string,
  showWatchButton: PropTypes.bool
}

export default EpisodeListItem
