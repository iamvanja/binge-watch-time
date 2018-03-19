import ServiceShowModel from 'models/ServiceShowModel'
import moment from 'moment'

const defaultQuery = {
  language: 'en-US',
  sortBy: 'popularity.desc',
  timezone: 'America/Phoenix',
  includeNullFirstAirDates: false
}

const getQuery = type => {
  let extraQuery = {}
  switch (type) {
    case 'new':
      extraQuery = {
        'firstAirDate.gte': moment().startOf('year').format('YYYY-MM-DD')
      }
      break
  }

  return { ...defaultQuery, ...extraQuery }
}

export const discover = (req, res, next) => {
  ServiceShowModel.discover(getQuery(req.params.type))
    .then(data => res.json(data))
    .catch(next)
}
