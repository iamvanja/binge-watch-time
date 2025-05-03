import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as ui from 'redux/actions/ui'
import * as selectors from 'redux/reducers/selectors'
import { GridContainer } from 'components/Grid'
import HorizontalListItem from 'components/HorizontalListItem'
import ContentBox from 'components/ContentBox'
import {
  DiscoverNowPlaying,
  DiscoverNew,
  DiscoverPopular,
  DiscoverTopRated,
  DiscoverByGenre,
  DiscoverUpcoming
} from './ConnectedLists'
import Select from 'components/Select'

class DiscoverPage extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  componentWillMount () {
    const { match } = this.props
    const { contentType } = match.params

    if (contentType) {
      // there is a content type from params - make sure everything is in sync
      this.props.onTypeChange(contentType)
    } else {
      // Handles not found scenario (/discover/foo)
      this.redirect('shows')
    }
  }

  componentDidUpdate (prevProps) {
    const { selectedContentType } = this.props

    if (prevProps.selectedContentType !== selectedContentType) {
      this.redirect(selectedContentType)
    }
  }

  redirect (path) {
    this.props.history.replace(`/discover/${path}`)
  }

  onChange (e) {
    this.props.onTypeChange(e.target.value)
  }

  render () {
    const { selectedContentType } = this.props

    return (
      <div className='page discover'>
        <GridContainer>
          <h1>
            Discover
            <Select
              onChange={this.onChange}
              options={[{
                label: 'Shows',
                value: 'shows'
              }, {
                label: 'Movies',
                value: 'movies'
              }]}
              value={selectedContentType}
            />
          </h1>

          {selectedContentType === 'movies' && (
            <ContentBox titleText='Now Playing in Theaters'>
              <DiscoverNowPlaying
                item={HorizontalListItem}
                type={selectedContentType}
              />
            </ContentBox>
          )}

          <ContentBox titleText='New'>
            <DiscoverNew
              item={HorizontalListItem}
              type={selectedContentType}
            />
          </ContentBox>

          <ContentBox titleText='Popular'>
            <DiscoverPopular
              item={HorizontalListItem}
              type={selectedContentType}
            />
          </ContentBox>

          <ContentBox titleText='Top Rated'>
            <DiscoverTopRated
              item={HorizontalListItem}
              type={selectedContentType}
            />
          </ContentBox>

          <DiscoverByGenre
            titleText='By Genre'
            item={HorizontalListItem}
            type={selectedContentType}
          />

          {selectedContentType === 'movies' && (
            <ContentBox titleText='Upcoming'>
              <DiscoverUpcoming
                item={HorizontalListItem}
                type={selectedContentType}
              />
            </ContentBox>
          )}
        </GridContainer>
      </div>
    )
  }
}

DiscoverPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      contentType: PropTypes.string
    }).isRequired
  }).isRequired,
  selectedContentType: PropTypes.oneOf(['shows', 'movies']),
  onTypeChange: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
}

export default connect(
  (state, ownProps) => ({
    selectedContentType: selectors.ui.getDiscoverType(
      state,
      ownProps.match.params.contentType
    )
  }),
  {
    onTypeChange: ui.setDiscoverType
  }
)(DiscoverPage)
