import ServiceShowModel from 'models/ServiceShowModel'
import moment from 'moment'

const defaultQuery = {
  sortBy: 'popularity.desc',
  includeNullFirstAirDates: false,
  withOriginalLanguage: 'en'
}

const getDiscoverQuery = (category, genreId) => {
  let extraQuery = {}
  switch (category) {
    case 'new':
      extraQuery = {
        'firstAirDate.gte': moment()
          .subtract(4, 'months')
          .startOf('month')
          .format('YYYY-MM-DD')
      }
      break
  }

  if (genreId) {
    extraQuery.withGenres = genreId
  }

  return { ...defaultQuery, ...extraQuery }
}

export const discoverByCategory = (req, res, next) => {
  ServiceShowModel.discover(getDiscoverQuery(req.params.category))
    .then(data => res.json(data))
    .catch(next)
}

export const discoverByGenreId = (req, res, next) => {
  ServiceShowModel.discover(getDiscoverQuery(null, req.params.genreId))
    .then(data => res.json(data))
    .catch(next)
}

export const one = (req, res, next) => {
  const { showId } = req.params
  ServiceShowModel.findOne(showId)
    .then(show => res.json(show))
    .catch(next)
}
