import ServiceShowModel from 'models/ServiceShowModel'
import moment from 'moment'

const defaultQuery = {
  sortBy: 'popularity.desc',
  includeNullFirstAirDates: false,
  withOriginalLanguage: 'en'
}

const getDiscoverQuery = type => {
  let extraQuery = {}
  switch (type) {
    case 'new':
      extraQuery = {
        'firstAirDate.gte': moment()
          .subtract(4, 'months')
          .startOf('month')
          .format('YYYY-MM-DD')
      }
      break
  }

  return { ...defaultQuery, ...extraQuery }
}

export const discover = (req, res, next) => {
  ServiceShowModel.discover(getDiscoverQuery(req.params.type))
    .then(data => res.json(data))
    .catch(next)
}

export const one = (req, res, next) => {
  const { showId } = req.params
  ServiceShowModel.findOne(showId)
    .then(show => res.json(show))
    .catch(next)
}
