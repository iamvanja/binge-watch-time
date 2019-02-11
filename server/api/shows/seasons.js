import { Router } from 'express'
import * as ShowController from 'controllers/ShowController'
import * as UserShowEpisodeController from 'controllers/UserShowEpisodeController'
import isEpisodeIdValid from 'middleware/isEpisodeIdValid'
import { SEASON_NUMBER, EPISODE_NUMBER } from './constants'

const router = Router({ mergeParams: true })

router.get(
  `/${SEASON_NUMBER}`,
  ShowController.season
)
router.get(
  `/${SEASON_NUMBER}/episodes/${EPISODE_NUMBER}`,
  ShowController.seasonEpisode
)

const watchArguments = [
  `/${SEASON_NUMBER}/episode/${EPISODE_NUMBER}/watch`,
  isEpisodeIdValid,
  UserShowEpisodeController.toggleEpisodeWatch
]

router.put(...watchArguments)

router.delete(...watchArguments)

export default router
