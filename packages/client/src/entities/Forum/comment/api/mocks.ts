export interface IComment {
  id: string
  content: string
  author: string
  topicId: string
  createdAt: string
  upvotes: number
}

export const mockComments: IComment[] = [
  {
    id: 'swc-001',
    content:
      'Для Acid Marshes обязательно бери мутацию "Кислотная адаптация" - снижает урон от луж на 60%. Без нее сложно выжить после 7 волны.',
    author: 'VeteranPlayer',
    topicId: 'swp-1',
    createdAt: '2025-04-16T15:45:00Z',
    upvotes: 0,
  },
  {
    id: 'swc-002',
    content:
      'А какие модули на турели ставишь? Мне кажется, что с огненным ампом сейчас перебор по ресурсам.',
    author: 'ResourceOptimizer',
    topicId: 'swp-1',
    createdAt: '2025-04-15T16:20:00Z',
    upvotes: 9,
  },
  {
    id: 'swc-003',
    content:
      'В следующем патче планируем добавить визуальные подсказки для алгоритма генерации. Следите за обновлениями!',
    author: 'SWARM_Designer',
    topicId: 'swp-2',
    createdAt: '2025-04-16T10:30:00Z',
    upvotes: 1,
  },
  {
    id: 'swc-004',
    content:
      'Попробуй комбинацию Nano Swarm + Poison Mod - получается мощный DoT эффект, особенно против боссов.',
    author: 'MetaSeeker',
    topicId: 'swp-4',
    createdAt: '2025-04-18T08:45:00Z',
    upvotes: 8,
  },
]

export const getCommentsByTopicId = async (
  topicId: string
): Promise<IComment[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        mockComments
          .filter(comment => comment.topicId === topicId)
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
      )
    }, 400)
  })
}
