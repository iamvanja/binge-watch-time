import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Loader from 'components/Loader'

const Item = ({ id, imgSrc, name }) =>
  <div className='horizontal-item'>
    <img src={imgSrc} alt={`${name} poster`} />
    <strong className='title'>{name}</strong>
    <Link to={`shows/${id}`} className='button expanded hollow'>DETAIL</Link>
  </div>

Item.propTypes = {
  id: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

// todo: make render props
class HorizontalList extends Component {
  constructor () {
    super()
    this.state = {
      isPending: true,
      list: []
    }
  }

  componentDidMount () {
    this.props.api()
      .then(data => {
        this.setState({
          list: data.results,
          isPending: false
        })
      })
      // eslint-disable-next-line handle-callback-err
      .catch(err => {
        this.setState({
          isPending: false
        })
      })
  }

  render () {
    const { isPending, list } = this.state
    return (
      <div className='horizontal-list'>
        {
          isPending
            ? <Loader />
            : list.length
              ? list
                .map(show =>
                  <Item
                    id={show.id}
                    key={show.id}
                    imgSrc={`https://image.tmdb.org/t/p/w300${show.posterPath}`}
                    name={show.name}
                  />)
              : 'No data'
        }
      </div>
    )
  }
}

HorizontalList.propTypes = {
  api: PropTypes.func.isRequired
}

export default HorizontalList
