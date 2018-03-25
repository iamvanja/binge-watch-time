import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { stringOrNumber, renderable } from 'constants/propTypes'
import HorizontalList from 'components/HorizontalList'
import ContentBox from 'components/ContentBox'
import Select from 'components/Select'
import { Grid, Cell } from 'components/Grid'

class ContentBoxSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentSelectValue: props.selectOptions[0].value
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    this.setState({ currentSelectValue: e.target.value })
  }

  render () {
    const { currentSelectValue } = this.state
    return (
      <ContentBox titleComponent={
        <div className='title'>
          <Grid align='middle'>
            <Cell small={6}>
              <h2>{this.props.titleText}</h2>
            </Cell>
            <Cell small={6} medium={4} className='medium-offset-2'>
              <Select
                onChange={this.onChange}
                options={this.props.selectOptions}
                defaultValue={currentSelectValue}
              />
            </Cell>
          </Grid>
        </div>
      }>
        <HorizontalList
          api={this.props.api}
          params={currentSelectValue}
          item={this.props.item}
        />
      </ContentBox>
    )
  }
}

ContentBoxSelect.propTypes = {
  selectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: stringOrNumber.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  titleText: PropTypes.string,
  api: PropTypes.func.isRequired,
  item: renderable.isRequired
}

export default ContentBoxSelect
