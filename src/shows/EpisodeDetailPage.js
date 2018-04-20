import React, { Fragment } from 'react'
import { stringOrNumber } from 'constants/propTypes'
import api from 'api'
import Fetch from 'components/Fetch'
import Loader from 'components/Loader'
import Image from 'components/Image'
import { IMG_BASE_URL, STILL_SIZES } from 'constants/tmdb'
import { formatDate } from 'utils/date'
import { formatSeasonEpisode } from 'utils/string'

const EpisodeDetailPage = ({ showId, seasonNumber, episodeNumber }) => {
  return (
    <div className='episode-detail-page'>
      <Fetch api={() => api.episodes.one(showId, seasonNumber, episodeNumber)}>
        {({ id, airDate, ...episode } = {}, isPending, error, api) => {
          if (isPending) {
            return <Loader />
          }

          if (error) {
            return (
              <p className='text-center subheader'>
                Error...
              </p>
            )
          }

          if (!id) {
            return (
              <p className='text-center subheader'>
                No data found...
              </p>
            )
          }

          return (
            <Fragment>
              <h2>{episode.name}</h2>
              <div className='episode-info'>
                <span>
                  {formatSeasonEpisode(seasonNumber, episodeNumber)}
                </span>
                |
                {airDate && (
                  <span>
                    {formatDate(airDate, 'dddd, MMMM D, YYYY')}
                  </span>
                )}
              </div>

              <hr />

              {episode.stillPath && (
                <div className='text-center'>
                  <Image
                    src={`${IMG_BASE_URL}/${STILL_SIZES.medium}${episode.stillPath}`}
                    alt={`${episode.name} still`}
                  />
                </div>
              )}

              <h3>Overview</h3>
              <p>{episode.overview || 'N/A'}</p>

            </Fragment>
          )
        }}
      </Fetch>
    </div>
  )
}

EpisodeDetailPage.propTypes = {
  showId: stringOrNumber.isRequired,
  seasonNumber: stringOrNumber.isRequired,
  episodeNumber: stringOrNumber.isRequired
}

export default EpisodeDetailPage
