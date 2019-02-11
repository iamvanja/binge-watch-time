import { Router } from 'express'
import * as UserShowController from 'controllers/UserShowController'
import isShowIdValid from 'middleware/isShowIdValid'

const router = Router({ mergeParams: true })

router.put('/', isShowIdValid, UserShowController.toggleStar)

router.delete('/', UserShowController.toggleStar)

export default router
