import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import debounce from 'lodash/debounce'
import Icon from 'ui/Icon'

const OffCanvasToggleButton = ({
  isSideVisible,
  onToggle,
  children,
  className,
  openIcon,
  closeIcon,
  ...props
}) => {
  // const iconName = `menu-${isSideVisible ? 'close' : 'open'}`
  const iconName = isSideVisible
    ? closeIcon || null
    : openIcon || null
  return (
    <button
      className={classnames('button', className)}
      onClick={onToggle}
    >
      <span>{children}</span>
      {iconName && <Icon icon={iconName} />}
    </button>
  )
}

OffCanvasToggleButton.propTypes = {
  isSideVisible: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  openIcon: PropTypes.string,
  closeIcon: PropTypes.string
}

class OffCanvasLayout extends React.Component {
  constructor (props) {
    super(props)

    // Perform debounce in React.js
    // https://stackoverflow.com/a/28046731/7627609
    this.handleKeyDown = debounce(this.handleKeyDown.bind(this), 250)
    this.handleResize = debounce(this.handleResize.bind(this), 500)
  }

  componentDidMount () {
    window.addEventListener('keydown', this.handleKeyDown, false)
    window.addEventListener('resize', this.handleResize, false)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeyDown, false)
    window.removeEventListener('resize', this.handleResize, false)
  }

  handleKeyDown (e) {
    // esc
    if (this.props.isSideVisible && e.keyCode === 27) {
      this.props.onClose()
    }
  }

  /**
   *
   * Closes menu in the event of a resize (poor man's responsivness solution)
   * Fixes bug when screen is resized from smaller to larger and there is a
   * revealFor prop (to force opening side on bigger screen). This results in
   * a situation where the component thinks the side is not visible whereas it
   * it is.
   * Proper solution (todo) includes reading window width from CSS for medium
   * and large and breakpoints and track the window width.
   *
   */
  handleResize () {
    if (this.props.isSideVisible && !!this.props.revealFor) {
      this.props.onClose()
    }
  }

  render () {
    const {
      SideContent,
      isSideVisible,
      children,
      onToggle,
      position,
      transition,
      revealFor,
      ...props
    } = this.props

    const sideClasses = classnames(
      'off-canvas',
      `position-${position}`,
      `is-transition-${transition}`,
      revealFor && `reveal-for-${revealFor}`,
      isSideVisible ? 'is-open' : 'is-close'
    )
    const contentClasses = classnames(
      'off-canvas-content',
      `has-position-${position}`,
      `has-transition-${transition}`,
      isSideVisible && `is-open-${position}`
    )
    const overlayClasses = classnames(
      'js-off-canvas-overlay',
      'is-overlay-fixed',
      isSideVisible && 'is-visible is-closable'
    )
    return (
      <div className='off-canvas-wrapper'>
        <div className={sideClasses}>
          <SideContent {...props} />
        </div>

        <div className={contentClasses}>
          {React.cloneElement(children, { ...props })}
        </div>
        <div className={overlayClasses} onClick={onToggle} />
      </div>
    )
  }
}

OffCanvasLayout.defaultProps = {
  position: 'left',
  transition: 'push'
}

OffCanvasLayout.propTypes = {
  isSideVisible: PropTypes.bool.isRequired,
  SideContent: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  transition: PropTypes.oneOf(['push', 'overlap']),
  revealFor: PropTypes.oneOf(['medium', 'large'])
}

export default OffCanvasLayout
export { OffCanvasToggleButton }
