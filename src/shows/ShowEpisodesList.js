import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import api from 'api'
import AccordionItem from 'components/AccordionItem'
import Fetch from 'components/Fetch'
import SeasonListItem from './SeasonListItem'
import EpisodeListItem from './EpisodeListItem'
import Loader from 'components/Loader'
import Button from 'components/Button'

const ShowEpisodesList = ({ seasons, showId, match }) => {
  return (
    <div className='show-episodes-list'>
      <ul className='accordion'>
        {seasons.map(({ seasonNumber, ...season } = {}, i) =>
          <AccordionItem
            key={seasonNumber}
            isLazyRender
            isOpen={i === 0}
            title={<SeasonListItem
              name={season.name}
              episodeCount={season.episodeCount}
              airDate={season.airDate}
              posterPath={season.posterPath}
            />}
          >
            <Fetch api={() => api.episodes.get(showId, seasonNumber)}>
              {({ episodes = [] } = {}, isPending, error, api) => {
                if (isPending) {
                  return <Loader />
                }

                if (error) {
                  return (
                    <div className='text-center'>
                      <p className='subheader'>
                      Error while loading episodes...
                      </p>
                      <Button onClick={api} className='hollow'>
                      Try loading again
                      </Button>
                    </div>
                  )
                }

                return episodes.length
                  ? (episodes.map(episode =>
                    <EpisodeListItem
                      key={episode.id}
                      link={`${match.url}/${episode.id}`}
                      name={episode.name}
                      showId={showId}
                      episodeId={episode.id}
                      seasonNumber={episode.seasonNumber}
                      episodeNumber={episode.episodeNumber}
                      firstAired={episode.airDate}
                    />
                  ))
                  : <p className='text-center subheader'>
                      No episodes...
                  </p>
              }}
            </Fetch>
          </AccordionItem>
        )}
      </ul>
    </div>
  )
}

ShowEpisodesList.propTypes = {
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      seasonNumber: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      episodeCount: PropTypes.number.isRequired,
      airDate: PropTypes.string,
      posterPath: PropTypes.string
    })
  ).isRequired,
  showId: PropTypes.number.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
}

export default withRouter(ShowEpisodesList)
