import { Router } from 'express'
import isAuthenticated from 'middleware/isAuthenticated'
import * as AuthController from 'controllers/AuthController'

const router = Router()

// todo: validations
router.post('/login', AuthController.login)
router.post('/verify', AuthController.verify)
router.get('/me', isAuthenticated, AuthController.me)
router.post('/logout', AuthController.logout)

export default router
