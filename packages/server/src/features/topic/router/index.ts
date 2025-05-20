import { Router } from 'express'
import { TopicController } from '../controller'

const topicRouter = Router()

topicRouter.post('/', TopicController.createTopic)
topicRouter.get('/', TopicController.getAllTopics)
topicRouter.get('/:id', TopicController.getTopicById)

export { topicRouter }
