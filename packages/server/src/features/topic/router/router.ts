import { Router } from 'express'
import { TopicController } from '../controller/controller'

const topicRouter = Router()

topicRouter.post('/', TopicController.createTopic)
topicRouter.get('/', TopicController.getAllTopics)
topicRouter.get('/:id', TopicController.getTopicById)
topicRouter.delete('/:id', TopicController.deleteTopic)
topicRouter.put('/:id', TopicController.updateTopic)
export { topicRouter }
