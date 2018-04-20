import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { renderable } from 'constants/propTypes'
import classnames from 'classnames'

export class AccordionItem extends Component {
  constructor () {
    super()
    this.state = {
      isOpen: false,
      hasBeenOpened: false
    }
    this.toggle = this.toggle.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount () {
    if (this.props.isOpen) {
      this.toggle()
    }
  }

  toggle () {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen, hasBeenOpened: true }))
  }

  handleKeyUp (e) {
    if (e.key === 'Enter') {
      this.toggle()
      e.preventDefault()
    }
  }

  render () {
    const { isLazyRender, title, children, tabIndex } = this.props
    const { isOpen, hasBeenOpened } = this.state
    const content = isLazyRender && !hasBeenOpened
      ? null
      : children

    return (
      <li className={classnames('accordion-item', { 'is-active': isOpen })}>
        <div
          className='accordion-title'
          onClick={this.toggle}
          onKeyUp={this.handleKeyUp}
          role='button'
          tabIndex={tabIndex}
          aria-current={isOpen ? 'true' : 'false'}
        >
          {title}
        </div>

        <div className='accordion-content' style={{
          display: isOpen ? 'block' : 'none'
        }}>
          {content}
        </div>

      </li>
    )
  }
}

AccordionItem.defaultProps = {
  isOpen: false,
  isLazyRender: false
}
AccordionItem.propTypes = {
  isOpen: PropTypes.bool,
  isLazyRender: PropTypes.bool,
  tabIndex: PropTypes.number.isRequired,
  title: renderable.isRequired,
  children: renderable.isRequired
}

export default AccordionItem
