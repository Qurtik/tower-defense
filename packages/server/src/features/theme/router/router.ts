import { Router } from 'express'
import { ThemeController } from '../controller/controller'

const router = Router()

router.post('/createTheme', ThemeController.createTheme)
router.get('/allThemes', ThemeController.getAllThemes)
router.get('/', ThemeController.getUserTheme)
router.delete('/', ThemeController.deleteUserTheme)
router.patch('/', ThemeController.upsertUserTheme)

export { router as themeRouter }
