import { Router } from 'express'
import * as UserShowController from 'controllers/UserShowController'
import isEntityIdValid from 'middleware/isEntityIdValid'

const router = Router({ mergeParams: true })

router.put('/', isEntityIdValid('show'), UserShowController.toggleStar)

router.delete('/', UserShowController.toggleStar)

export default router
