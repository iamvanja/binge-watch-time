import { Router } from 'express'
import * as ShowController from 'controllers/ShowController'
import * as UserShowController from 'controllers/UserShowController'

const router = Router()

router.get('/:showId(\\d+)', ShowController.one)
router.get('/:showId(\\d+)/seasons/:seasonNumber(\\d+)/episodes', ShowController.seasonEpisodes)
router.get('/:showId(\\d+)/seasons/:seasonNumber(\\d+)/episodes/:episodeNumber(\\d+)', ShowController.seasonEpisode)
router.get('/search/:name', ShowController.search)

router.put('/:showId(\\d+)/star', UserShowController.toggleStar)
router.delete('/:showId(\\d+)/star', UserShowController.toggleStar)
router.get('/starred', UserShowController.starredShows)

export default router
