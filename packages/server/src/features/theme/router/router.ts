import { Router } from 'express'
import { ThemeController } from '../controller/controller'

const router = Router()

router.post('/', ThemeController.createTheme)
router.get('/', ThemeController.getAllThemes)
router.get('/:id', ThemeController.getThemeById)
router.delete('/:id', ThemeController.deleteTheme)
router.patch('/:id', ThemeController.updateTheme)

export { router as themeRouter }
