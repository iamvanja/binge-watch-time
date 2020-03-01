import { Router } from 'express'
import * as MovieController from 'controllers/MovieController'
import * as UserMovieController from 'controllers/UserMovieController'
import isAuthenticated from 'middleware/isAuthenticated'
import { MOVIE_ID } from './constants'
import lists from './lists'
import star from './star'

const router = Router({ mergeParams: true })

router.use(isAuthenticated)

router.use(`/${MOVIE_ID}/star`, star)
router.use('/lists', lists)

router.get(`/${MOVIE_ID}`, MovieController.one)
router.get('/search/:name', MovieController.search)
router.get('/starred', UserMovieController.starredMovies)
router.get('/starred/list/:listId', UserMovieController.starredMoviesByList)

export default router
