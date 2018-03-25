import { Router } from 'express'
import * as ShowController from 'controllers/ShowController'

const router = Router()

router.get(
  '/shows/category/:category(new|popular)',
  ShowController.discoverByCategory
)
router.get(
  '/shows/genre/:genreId(\\d+)',
  ShowController.discoverByGenreId
)

export default router
