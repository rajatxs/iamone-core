import { Router } from 'express'
import { send200Response } from '../utils/api'

const router = Router()

/**
 * @route GET /x/ping
 */
router.get('/x/ping', function (req, res) {
   send200Response(res, "Pong!")
})

export default router
