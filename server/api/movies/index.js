import { Router } from 'express'
import * as MovieController from 'controllers/MovieController'
import isAuthenticated from 'middleware/isAuthenticated'
import { MOVIE_ID } from './constants'

const router = Router({ mergeParams: true })

router.use(isAuthenticated)

router.get(`/${MOVIE_ID}`, MovieController.one)
router.get('/search/:name', MovieController.search)

export default router
