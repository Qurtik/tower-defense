import { Router } from 'express'
import { CommentReactionController } from '../controller/controller'

const router = Router({ mergeParams: true })

router.post('/:idComment/reactions', CommentReactionController.create)
router.get(
  '/:idComment/reactions',
  CommentReactionController.getReactionsByIdComment
)
router.delete('/:idComment/reactions', CommentReactionController.delete)

export { router as commentReactionRouter }
