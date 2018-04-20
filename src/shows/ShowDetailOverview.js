import React, { Component } from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'
import { Grid, Cell } from 'components/Grid'
import Button from 'components/Button'
import YouTubeEmbed from 'components/YouTubeEmbed'
import DescriptionItem from 'components/DescriptionItem'

class ShowDetailOverview extends Component {
  constructor () {
    super()
    this.state = {
      isEmbedShown: false,
      youtubeVideo: null
    }

    this.showEmbed = this.showEmbed.bind(this)
  }

  componentDidMount () {
    const { videos } = this.props
    const youtubeVideo = videos.length && find(videos, {
      site: 'YouTube'
    })
    if (youtubeVideo) {
      this.setState({ youtubeVideo })
    }
  }

  showEmbed () {
    this.setState({ isEmbedShown: true })
  }

  render () {
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
      homepage
    } = this.props
    const { isEmbedShown, youtubeVideo } = this.state

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
                  {
                    isEmbedShown
                      ? <YouTubeEmbed video={youtubeVideo} />
                      : <Button
                        icon='cinema'
                        className='expanded hollow'
                        onClick={this.showEmbed}
                      >
                        Play Trailer
                      </Button>
                  }
                </Cell>
              </Grid>
              : null
            }
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

export default ShowDetailOverview
