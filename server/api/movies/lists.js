import { Router } from 'express'
import * as MovieListController from 'controllers/MovieListController'

const router = Router()

router.get('/', MovieListController.find)

export default router
