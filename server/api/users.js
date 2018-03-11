import { Router } from 'express'
import * as UserController from 'controllers/UserController'

const router = Router()

router.post('/register', UserController.register)
router.get('/:userId', UserController.one)

export default router
