import { Router } from 'express'
import { TopicController } from '../controller/controller'

const router = Router()

router.post('/', TopicController.createTopic)
router.get('/', TopicController.getAllTopics)
router.get('/:id', TopicController.getTopicById)
router.delete('/:id', TopicController.deleteTopic)
router.put('/:id', TopicController.updateTopic)

export { router as topicRouter }
