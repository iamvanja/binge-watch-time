import { Router } from 'express'
import * as ShowController from 'controllers/ShowController'
import * as MovieController from 'controllers/MovieController'
import isAuthenticated from 'middleware/isAuthenticated'

const router = Router()

router.use(isAuthenticated)

router.get(
  '/shows/category/:category(new|popular)',
  ShowController.discoverByCategory
)
router.get(
  '/shows/category/:category(top-rated)',
  ShowController.discoverMisc
)
router.get(
  '/shows/genre/:genreId(\\d+)',
  ShowController.discoverByGenreId
)
router.get(
  '/movies/category/:category(new|popular)',
  MovieController.discoverByCategory
)
router.get(
  '/movies/category/:category(now-playing|top-rated|upcoming)',
  MovieController.discoverMisc
)
router.get(
  '/movies/genre/:genreId(\\d+)',
  MovieController.discoverByGenreId
)

export default router
