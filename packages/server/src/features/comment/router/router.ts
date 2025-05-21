import { Router } from 'express'
import { CommentController } from '../controller/controller'

const router = Router()

router.post('/:topicId', CommentController.create)
router.get('/:topicId', CommentController.getByTopicId)
router.delete('/:topicId', CommentController.delete)
router.patch('/:topicId', CommentController.update)

export { router as commentRouter }
