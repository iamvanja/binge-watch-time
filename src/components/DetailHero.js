import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { renderable } from 'constants/propTypes'
import classnames from 'classnames'
import { GridContainer, Grid, Cell } from 'components/Grid'
import ImageTmdb from 'components/ImageTmdb'
import { buttonize } from 'components/Button'

class ShowHero extends Component {
  constructor (props) {
    super(props)

    this.state = {
      clickCount: 0
    }

    this.handleTitleClick = this.handleTitleClick.bind(this)
  }

  handleTitleClick (e) {
    this.setState(prevState => ({
      clickCount: prevState.clickCount + 1
    }), () => {
      if (this.state.clickCount === 20) {
        this.props.onSpecial(e)
      }
    })
  }

  render () {
    const {
      name,
      isMini,
      backdropPath,
      posterPath,
      listName,
      children
    } = this.props

    return (
      <div className={classnames('detail-hero overlay-bg', { 'mini': isMini })}>
        {backdropPath && (
          <ImageTmdb
            className='bwt-background-image'
            type='backdrop'
            size='large'
            path={backdropPath}
            name={name}
          />
        )}

        <GridContainer>
          <Grid gutters='margin'>
            <Cell
              alignSelf='bottom'
              className={classnames(
                'title',
                isMini ? 'auto' : 'small-12 large-auto'
              )}
            >
              <h1 {...buttonize(this.handleTitleClick)}>
                {name}
                {isMini && listName
                  ? <small> ({listName})</small>
                  : null
                }
              </h1>
            </Cell>

            {!isMini && (
              <Cell className='auto large-shrink info' alignSelf='middle'>
                {children}
              </Cell>
            )}

            <Cell className='shrink poster bwt-image-holder' alignSelf='middle'>
              <ImageTmdb
                type='poster'
                size='medium'
                path={posterPath}
                name={name}
                width={176}
                height={260}
              />
            </Cell>

          </Grid>
        </GridContainer>
      </div>
    )
  }
}

ShowHero.propTypes = {
  name: PropTypes.string.isRequired,
  isMini: PropTypes.bool,
  backdropPath: PropTypes.string,
  posterPath: PropTypes.string,
  listName: PropTypes.string,
  children: renderable.isRequired,
  onSpecial: PropTypes.func.isRequired
}

export default ShowHero
