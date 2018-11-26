import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  getShowSeasons,
  isShowStarred,
  getNextEpisode
} from 'reducers'
import AccordionItem from 'components/AccordionItem'
import SeasonListItemHeader from './SeasonListItemHeader'
import SeasonEpisodeList from './SeasonEpisodeList'

const SeasonList = (props) => {
  const { seasons, match, isStarred, currentSeasonNumber } = props

  return (
    <div className='show-episodes-list'>
      <ul className='accordion'>
        {seasons.map(({ seasonNumber, ...season } = {}, i) =>
          <AccordionItem
            key={seasonNumber}
            tabIndex={0}
            isLazyRender
            isOpen={seasonNumber === (currentSeasonNumber || 1)}
            title={<SeasonListItemHeader {...season} />}
          >
            <SeasonEpisodeList
              {...season}
              seasonNumber={seasonNumber}
              isShowStarred={isStarred}
              baseEpisodeUrl={match.url}
            />
          </AccordionItem>
        )}
      </ul>
    </div>
  )
}

SeasonList.propTypes = {
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      seasonNumber: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      episodeCount: PropTypes.number.isRequired,
      airDate: PropTypes.string,
      posterPath: PropTypes.string
    })
  ).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired,
  isStarred: PropTypes.bool,
  currentSeasonNumber: PropTypes.number
}

export default connect(
  (_, ownProps) => state => {
    const showId = parseInt(ownProps.match.params.showId, 10)
    const nextEpisode = getNextEpisode(state, showId)

    return {
      showId,
      isStarred: isShowStarred(state, showId),
      seasons: getShowSeasons(state, showId),
      currentSeasonNumber: nextEpisode.seasonNumber
    }
  }
)(SeasonList)
