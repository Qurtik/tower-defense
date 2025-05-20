import { Router } from 'express'
import { CommentController } from '../controller'

const router = Router()

router.post('/:topicId', CommentController.create)

router.get('/:topicId', CommentController.getByTopicId)

router.delete('/:id', CommentController.delete)

export { router as commentRouter }
