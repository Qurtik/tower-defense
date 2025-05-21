import { Router } from 'express'
import { UserController } from '../controller/controller'

const router = Router()

router.put('/', UserController.upsertUser)
router.get('/:id', UserController.getUser)

export { router as userRouter }
