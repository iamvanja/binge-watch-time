import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as ui from 'redux/actions/ui'
import * as selectors from 'redux/reducers/selectors'
import { GridContainer } from 'components/Grid'
import HorizontalListItem from 'components/HorizontalListItem'
import ContentBox from 'components/ContentBox'
import { DiscoverNew, DiscoverPopular, DiscoverByGenre } from './ConnectedLists'
import Select from 'components/Select'

class DiscoverPage extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  componentWillMount () {
    const { match, selectedContentType } = this.props
    const { contentType } = match.params

    if (contentType) {
      // there is a content type from params - make sure everything is in sync
      this.props.onTypeChange(contentType)
    } else {
      // hit root url, redirect to the default type
      this.redirect(selectedContentType)
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
  } h

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

          <DiscoverByGenre
            titleText='By Genre'
            item={HorizontalListItem}
            type={selectedContentType}
          />
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
  state => ({
    selectedContentType: selectors.ui.getDiscoverType(state)
  }),
  {
    onTypeChange: ui.setDiscoverType
  }
)(DiscoverPage)
