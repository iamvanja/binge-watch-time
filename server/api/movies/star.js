import { Router } from 'express'
import * as UserMovieController from 'controllers/UserMovieController'
import isEntityIdValid from 'middleware/isEntityIdValid'

const router = Router({ mergeParams: true })

router.put('/', isEntityIdValid('movie'), UserMovieController.toggleStar)

router.delete('/', UserMovieController.toggleStar)

export default router
