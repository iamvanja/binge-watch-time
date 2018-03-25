import React from 'react'
import PropTypes from 'prop-types'
import { renderable } from 'constants/propTypes'
import classnames from 'classnames'

const ContentBox = ({
  titleText,
  className,
  children,
  titleComponent
}) =>
  <div className={classnames('content-box', className)}>
    {
      titleComponent || (titleText
        ? <h2 className='title'>{titleText}</h2>
        : null)
    }
    <div className='content'>{children}</div>
  </div>

ContentBox.propTypes = {
  titleText: PropTypes.string,
  children: renderable.isRequired,
  className: PropTypes.string,
  titleComponent: renderable
}

export default ContentBox
