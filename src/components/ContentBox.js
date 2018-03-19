import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const ContentBox = ({
  titleText,
  className,
  children,
  titleComponent: TitleComponent
}) =>
  <div className={classnames('content-box', className)}>
    {
      TitleComponent
        ? <TitleComponent />
        : titleText
          ? <h2 className='title'>{titleText}</h2>
          : null
    }
    <div className='content'>{children}</div>
  </div>

ContentBox.propTypes = {
  titleText: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  titleComponent: PropTypes.func
}

export default ContentBox
