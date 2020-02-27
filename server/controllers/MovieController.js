import ServiceMovieModel from 'models/ServiceMovieModel'
import moment from 'moment'

const defaultQuery = {
  sortBy: 'popularity.desc',
  withOriginalLanguage: 'en'
}

const getDiscoverQuery = (category, genreId) => {
  let extraQuery = {}
  switch (category) {
    case 'new':
      extraQuery = {
        'primaryReleaseDate.gte': moment()
          .subtract(1, 'months')
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
  ServiceMovieModel.discover(getDiscoverQuery(req.params.category))
    .then(data => res.json(data))
    .catch(next)
}

export const discoverByGenreId = (req, res, next) => {
  ServiceMovieModel.discover(getDiscoverQuery(null, req.params.genreId))
    .then(data => res.json(data))
    .catch(next)
}

export const one = (req, res, next) => {
  const { movieId } = req.params

  ServiceMovieModel.one({ id: movieId })
    .then(movie => res.json(movie))
    .catch(next)
}
