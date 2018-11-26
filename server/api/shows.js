import { Router } from 'express'
import * as ShowController from 'controllers/ShowController'
import * as UserShowController from 'controllers/UserShowController'
import * as UserShowEpisodeController from 'controllers/UserShowEpisodeController'
import isShowIdValid from 'middleware/isShowIdValid'
import isAuthenticated from 'middleware/isAuthenticated'
import isEpisodeIdValid from 'middleware/isEpisodeIdValid'

const router = Router()

router.use(isAuthenticated)

const SHOW_ID = ':showId(\\d+)'
const SEASON_NUMBER = ':seasonNumber(\\d+)'
const EPISODE_NUMBER = ':episodeNumber(\\d+)'

router.get(
  `/${SHOW_ID}`,
  ShowController.one
)
router.get(
  `/${SHOW_ID}/seasons/${SEASON_NUMBER}`,
  ShowController.season
)
router.get(
  `/${SHOW_ID}/seasons/${SEASON_NUMBER}/episodes/${EPISODE_NUMBER}`, ShowController.seasonEpisode
)
router.get(
  '/search/:name',
  ShowController.search
)

router.put(
  `/${SHOW_ID}/star`,
  isShowIdValid,
  UserShowController.toggleStar
)
router.delete(
  `/${SHOW_ID}/star`,
  UserShowController.toggleStar
)
router.get(
  '/starred',
  UserShowController.starredShows
)

router.put(
  `/${SHOW_ID}/season/${SEASON_NUMBER}/episode/${EPISODE_NUMBER}/watch`,
  isEpisodeIdValid,
  UserShowEpisodeController.toggleEpisodeWatch
)
router.delete(
  `/${SHOW_ID}/season/${SEASON_NUMBER}/episode/${EPISODE_NUMBER}/watch`,
  isEpisodeIdValid,
  UserShowEpisodeController.toggleEpisodeWatch
)
router.get(
  '/episodes/watched',
  UserShowEpisodeController.watchedEpisodes
)

export default router
