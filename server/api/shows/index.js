import { Router } from 'express'
import * as ShowController from 'controllers/ShowController'
import * as UserShowController from 'controllers/UserShowController'
import * as UserShowEpisodeController from 'controllers/UserShowEpisodeController'
import isAuthenticated from 'middleware/isAuthenticated'
import { SHOW_ID } from './constants'
import lists from './lists'
import seasons from './seasons'
import star from './star'

const router = Router({ mergeParams: true })

router.use(isAuthenticated)

router.use(`/${SHOW_ID}/seasons`, seasons)
router.use(`/${SHOW_ID}/star`, star)
router.use('/lists', lists)

router.get(`/${SHOW_ID}`, ShowController.one)
router.get('/search/:name', ShowController.search)
router.get('/starred', UserShowController.starredShows)
router.get('/episodes/watched', UserShowEpisodeController.watchedEpisodes)

export default router
