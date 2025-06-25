import {
  parseUserId,
  requireAdmin,
  requireAuth,
} from '../../../app/middlewares/auth'

import { Router } from 'express'
import { ThemeController } from '../controller/controller'

const router = Router()

router.post('/', requireAdmin, ThemeController.createTheme)

router.get('/:all?', parseUserId, ThemeController.getTheme)
router.delete('/', requireAuth, ThemeController.deleteUserTheme)
router.patch('/', requireAuth, ThemeController.upsertUserTheme)

export { router as themeRouter }
