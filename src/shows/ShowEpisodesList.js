import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import api from 'api'
import { Grid, Cell } from 'components/Grid'
import AccordionItem from 'components/AccordionItem'
import SeasonListItem from './SeasonListItem'
import EpisodeListItem from './EpisodeListItem'

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
            <SeasonEpisodes
              showId={showId}
              seasonNumber={seasonNumber}
              baseUrl={match.url}
            />
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
      airDate: PropTypes.string.isRequired,
      posterPath: PropTypes.string
    })
  ).isRequired,
  showId: PropTypes.number.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
}

// todo: Fetch component

class SeasonEpisodes extends Component {
  constructor () {
    super()
    this.state = {
      episodes: []
    }
  }

  componentDidMount () {
    this.loadData()
  }

  loadData () {
    const { showId, seasonNumber } = this.props

    this.setState({ isPending: true, isError: false })
    api.episodes.get(showId, seasonNumber)
      .then(({ episodes }) => {
        this.setState({
          episodes,
          isPending: false
        })
      })
      // eslint-disable-next-line handle-callback-err
      .catch(err => {
        this.setState({ isPending: false, isError: true })
      })
  }

  render () {
    const { episodes } = this.state
    const { showId, baseUrl } = this.props

    return (
      <div className='show-episodes-list'>
        <Grid gutters='margin'>
          <Cell small={12}>
            {
              episodes.map(episode =>
                <EpisodeListItem
                  key={episode.id}
                  link={`${baseUrl}/${episode.id}`}
                  name={episode.name}
                  showId={showId}
                  episodeId={episode.id}
                  seasonNumber={episode.seasonNumber}
                  episodeNumber={episode.episodeNumber}
                  firstAired={episode.airDate}
                />
              )
            }
          </Cell>
        </Grid>
      </div>
    )
  }
}

SeasonEpisodes.propTypes = {
  showId: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  baseUrl: PropTypes.string.isRequired
}

export default withRouter(ShowEpisodesList)
