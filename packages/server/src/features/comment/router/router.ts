import { Router } from 'express'
import { CommentController } from '../controller/controller'

const router = Router()

router.post('/:topicId', CommentController.create)
router.get('/:topicId', CommentController.getByTopicId)
router.delete('/:id', CommentController.delete)
router.put('/:id', CommentController.update)

export { router as commentRouter }
