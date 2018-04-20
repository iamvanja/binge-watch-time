import React from 'react'
import PropTypes from 'prop-types'
import { renderable } from 'constants/propTypes'
import Loader from 'components/Loader'
import Fetch from 'components/Fetch'

const HorizontalList = ({ api, params, item: Item }) => {
  return (
    <div className='horizontal-list'>
      <Fetch api={api} apiParams={params}>
        {({ results = [] } = {}, isPending, error, api) => {
          if (isPending) {
            return <Loader />
          }

          if (!results.length) {
            return (
              <p className='text-center subheader'>
                No data found...
              </p>
            )
          }

          return results.map(show =>
            <Item key={show.id} {...show} />
          )
        }}
      </Fetch>
    </div>
  )
}

HorizontalList.propTypes = {
  api: PropTypes.func.isRequired,
  params: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  item: renderable.isRequired

}

export default HorizontalList
