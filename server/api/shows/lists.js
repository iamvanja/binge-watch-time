import { Router } from 'express'
import * as ShowListController from 'controllers/ShowListController'

const router = Router()

router.get('/', ShowListController.find)

export default router
