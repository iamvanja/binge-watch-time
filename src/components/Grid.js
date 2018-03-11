import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const GridContainer = ({ children, className, fluid, full, ...props }) => {
  const classes = classnames('grid-container', { fluid, full }, className)

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  )
}

GridContainer.propTypes = {
  fluid: PropTypes.bool,
  full: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node
}

const getDirectionClass = (isVertical, gutters = null) => {
  return isVertical === true
    ? gutters
      ? `grid-${gutters}-y`
      : 'grid-y'
    : gutters
      ? `grid-${gutters}-x`
      : 'grid-x'
}

const horizontalAlignments = [
  'center',
  'right',
  'justify',
  'spaced'
]

const verticalAlignments = [
  'top',
  'middle',
  'bottom',
  'stretch'
]

const Grid = ({ children, vertical, gutters, align, className, ...props }) => {
  const classes = classnames(
    getDirectionClass(vertical),
    gutters && getDirectionClass(vertical, gutters),
    align && `align-${align}`,
    className
  )

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  )
}

Grid.propTypes = {
  vertical: PropTypes.bool,
  gutters: PropTypes.oneOf(['margin', 'padding']),
  align: PropTypes.oneOf([...horizontalAlignments, ...verticalAlignments]),
  children: PropTypes.node,
  className: PropTypes.string
}

const Cell = ({
  children,
  className,
  small,
  medium,
  large,
  alignSelf,
  ...props
}) => {
  const classes = classnames(
    'cell',
    small && `small-${small}`,
    medium && `medium-${medium}`,
    large && `large-${large}`,
    alignSelf && `align-self-${alignSelf}`,
    className
  )

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  )
}

Cell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  small: PropTypes.number,
  medium: PropTypes.number,
  large: PropTypes.number,
  alignSelf: PropTypes.oneOf([...horizontalAlignments, ...verticalAlignments])
}

export { GridContainer, Grid, Cell }
