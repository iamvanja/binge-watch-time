import { Router } from 'express'
import * as ShowController from 'controllers/ShowController'

const router = Router()

router.get('/:showId(\\d+)', ShowController.one)
router.get('/:showId(\\d+)/seasons/:seasonNumber(\\d+)/episodes', ShowController.seasonEpisodes)
router.get('/:showId(\\d+)/seasons/:seasonNumber(\\d+)/episodes/:episodeNumber(\\d+)', ShowController.seasonEpisode)
router.get('/search/:name', ShowController.search)

export default router
