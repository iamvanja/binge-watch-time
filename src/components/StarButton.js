import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as starredShows from 'actions/starredShows'
import { isShowStarred, isRequestPending } from 'reducers'
import { renderable } from 'constants/propTypes'
import classnames from 'classnames'
import Button from './Button'

export class StarButton extends React.Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    const { isStarred, onStar, onUnstar, id } = this.props
    const action = isStarred ? onUnstar : onStar

    action(id)
  }

  render () {
    const {
      className,
      isStarred,
      activeClass,
      isPending,
      children,
      starLabel,
      unstarLabel,
      onStar,
      onUnstar,
      ...rest
    } = this.props

    return (
      <Button
        {...rest}
        className={classnames(className, isStarred && activeClass)}
        onClick={this.onClick}
        disabled={isPending}
      >
        {
          children || (isStarred ? unstarLabel : starLabel)
        }
      </Button>
    )
  }
}

StarButton.defaultProps = {
  starLabel: 'STAR',
  unstarLabel: 'UNSTAR',
  activeClass: 'active'
}

StarButton.propTypes = {
  starLabel: PropTypes.string,
  className: PropTypes.string,
  unstarLabel: PropTypes.string,
  activeClass: PropTypes.string,
  onStar: PropTypes.func.isRequired,
  onUnstar: PropTypes.func.isRequired,
  isStarred: PropTypes.bool.isRequired,
  children: renderable,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  isPending: PropTypes.bool
}

export default connect(
  (state, { id }) => ({
    isPending: (
      isRequestPending(state, `STAR_${id}`) ||
      isRequestPending(state, `UNSTAR_${id}`)
    ),
    isStarred: isShowStarred(state, id)
  }),
  dispatch => ({
    onStar: showId => dispatch(starredShows.star(showId)),
    onUnstar: showId => dispatch(starredShows.unstar(showId))
  })
)(StarButton)
