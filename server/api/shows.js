import { Router } from 'express'
import * as ShowController from 'controllers/ShowController'

const router = Router()

router.get('/:showId(\\d+)', ShowController.one)
router.get('/search/:name', ShowController.search)

export default router
