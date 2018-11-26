import { Router } from 'express'
import * as ShowController from 'controllers/ShowController'
import isAuthenticated from 'middleware/isAuthenticated'

const router = Router()

router.use(isAuthenticated)

router.get(
  '/shows/category/:category(new|popular)',
  ShowController.discoverByCategory
)
router.get(
  '/shows/genre/:genreId(\\d+)',
  ShowController.discoverByGenreId
)

export default router
