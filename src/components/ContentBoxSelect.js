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
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    this.props.onChange(e.target.value)
  }

  render () {
    const { currentSelectValue } = this.props

    return (
      <ContentBox titleComponent={
        <div className='title'>
          <Grid align='middle'>
            <Cell small={6}>
              <h2>{this.props.titleText}</h2>
            </Cell>
            <Cell
              small={6}
              medium={3}
              large={2}
              className='medium-offset-3 large-offset-4'
            >
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
          isPending={this.props.isPending}
          results={this.props.results}
          onLoad={this.props.onLoad}
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
  currentSelectValue: stringOrNumber.isRequired,
  isPending: PropTypes.bool,
  results: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onLoad: PropTypes.func,
  item: renderable.isRequired
}

export default ContentBoxSelect
