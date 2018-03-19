import { Router } from 'express'
import * as ShowController from 'controllers/ShowController'

const router = Router()

router.get('/shows/:type(new|popular)', ShowController.discover)

export default router
