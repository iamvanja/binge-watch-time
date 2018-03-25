import { Router } from 'express'
import errorHandler from 'utils/errorHandler'

import auth from './auth'
import discover from './discover'
import healthcheck from './healthcheck'
import shows from './shows'
import users from './users'

const router = Router()

// Index Fallback
router.get('/', (req, res) => res.sendStatus(204))

// Routes
router.use('/auth', auth)
router.use('/discover', discover)
router.use('/healthcheck', healthcheck)
router.use('/shows', shows)
router.use('/users', users)

// Not Found
router.use((req, res) => res.sendStatus(404))

// Route Error Handler
router.use(errorHandler)

export default router
