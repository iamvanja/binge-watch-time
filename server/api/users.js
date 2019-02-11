import { Router } from 'express'
import * as UserController from 'controllers/UserController'

const router = Router()

router.post('/register', UserController.register)
router.post('/password-reset/request', UserController.passwordResetRequest)
router.post('/password-reset', UserController.passwordReset)
router.get('/:userId', UserController.one)

export default router
