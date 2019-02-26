import ServiceShowModel from 'models/ServiceShowModel'
import ServiceShowEpisodeModel from 'models/ServiceShowEpisodeModel'
import { NotFound } from 'utils/throwables'
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

  ServiceShowModel.one({ id: showId })
    .then(show => res.json(show))
    .catch(next)
}

export const search = (req, res, next) => {
  ServiceShowModel.search({ query: req.params.name })
    .then(data => res.json(data))
    .catch(next)
}

export const setSeason = (req, res, next) => {
  const { showId, seasonNumber } = req.params

  ServiceShowEpisodeModel.search({ id: showId, seasonNumber })
    .then((response = {}) => {
      if (response.id) {
        req.season = response
      }
    })
    .then(() =>
      !req.season
        ? next(new NotFound())
        : next()
    )
    .catch(next)
}

export const season = (req, res, next) =>
  res.json(req.season)

export const seasonEpisode = (req, res, next) => {
  const { showId, ...rest } = req.params
  ServiceShowEpisodeModel.one({
    id: showId,
    ...rest,
    appendToResponse: 'external_ids,videos,images'
  })
    .then(({ videos, images, ...data }) => ({
      ...data,
      videos: videos.results,
      images: images.stills
    }))
    .then(data => res.json(data))
    .catch(next)
}
