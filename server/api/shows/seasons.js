import { Router } from 'express'
import * as ShowController from 'controllers/ShowController'
import * as UserShowEpisodeController from 'controllers/UserShowEpisodeController'
import isEpisodeIdValid from 'middleware/isEpisodeIdValid'
import { SEASON_NUMBER, EPISODE_NUMBER } from './constants'

const router = Router({ mergeParams: true })

router.get(
  `/${SEASON_NUMBER}`,
  ShowController.setSeason,
  ShowController.season
)
router.get(
  `/${SEASON_NUMBER}/episodes/${EPISODE_NUMBER}`,
  ShowController.seasonEpisode
)

const watchEpisodeArguments = [
  `/${SEASON_NUMBER}/episode/${EPISODE_NUMBER}/watch`,
  isEpisodeIdValid,
  UserShowEpisodeController.toggleEpisodeWatch
]

const watchSeasonArguments = [
  `/${SEASON_NUMBER}/watch`,
  ShowController.setSeason,
  UserShowEpisodeController.toggleSeasonEpisodesWatch
]

router.put(...watchEpisodeArguments)
router.put(...watchSeasonArguments)

router.delete(...watchEpisodeArguments)
router.delete(...watchSeasonArguments)

export default router
