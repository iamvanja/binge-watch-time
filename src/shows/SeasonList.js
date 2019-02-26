import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as selectors from 'redux/reducers/selectors'
import AccordionItem from 'components/AccordionItem'
import SeasonListItemHeader from './SeasonListItemHeader'
import SeasonEpisodeList from './SeasonEpisodeList'

const SeasonList = (props) => {
  const { seasons, match, isStarred, currentSeasonNumber } = props

  return (
    <div className='show-episodes-list'>
      <ul className='accordion'>
        {seasons
          .filter(({ seasonNumber }) => seasonNumber > 0)
          .map((season = {}, i) => {
            const { seasonNumber } = season

            return (
              <AccordionItem
                key={seasonNumber}
                tabIndex={0}
                isLazyRender
                isOpen={seasonNumber === (currentSeasonNumber || 1)}
                title={(
                  <SeasonListItemHeader
                    {...season}
                    airingSeasonNumber={props.airingSeasonNumber}
                  />
                )}
              >
                <SeasonEpisodeList
                  {...season}
                  seasonNumber={seasonNumber}
                  isShowStarred={isStarred}
                  baseEpisodeUrl={match.url}
                />
              </AccordionItem>
            )
          })}
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
  currentSeasonNumber: PropTypes.number,
  airingSeasonNumber: PropTypes.number
}

export default connect(
  (_, ownProps) => state => {
    const showId = parseInt(ownProps.match.params.showId, 10)
    const nextEpisode = selectors.getNextEpisode(state, showId)
    const show = selectors.shows.getShow(state, showId)

    return {
      showId,
      isStarred: selectors.starredShows.isShowStarred(state, showId),
      seasons: selectors.getShowSeasons(state, showId),
      currentSeasonNumber: nextEpisode.seasonNumber,
      airingSeasonNumber: (show.nextEpisodeToAir || {}).seasonNumber
    }
  }
)(SeasonList)
