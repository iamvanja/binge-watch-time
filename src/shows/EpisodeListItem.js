import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Icon from 'components/Icon'
import { Grid, Cell } from 'components/Grid'
import { padSeasonEpisode } from 'utils/string'

const EpisodeListItem = ({
  link,
  name,
  showId,
  episodeId,
  seasonNumber,
  episodeNumber,
  firstAired
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
          {firstAired && <span className='subheader'>First aired: {firstAired}</span>}
        </Link>
      </Cell>
      <Cell className='shrink'>
        <button className='episode-watch-toggle' disabled>
          <Icon icon='eye' />
        </button>
      </Cell>
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
  firstAired: PropTypes.string
}

export default EpisodeListItem
