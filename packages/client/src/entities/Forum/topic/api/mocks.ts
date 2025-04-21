export interface ITopic {
  id: string
  title: string
  content: string
  author: string
  authorAvatar: string
  createdAt: string
  commentCount: number
}

export const mockTopics: ITopic[] = [
  {
    id: 'swp-1',
    title: 'Лучшие билды для 10 волны в SWARM PROTOCOL',
    content:
      'Поделюсь своим билдом, который стабильно проходит 10 волну на сложности Hard...',
    author: 'DroneCommander',
    authorAvatar: 'swarm-drone-1.png',
    createdAt: '2025-04-15T14:22:00Z',
    commentCount: 24,
  },
  {
    id: 'swp-2',
    title: 'Официальное руководство по мутациям дронов',
    content: 'Полное описание всех мутационных веток и их синергий...',
    author: 'SWARM_Dev',
    authorAvatar: 'swarm-dev.png',
    createdAt: '2025-04-10T11:30:00Z',
    commentCount: 42,
  },
  {
    id: 'swp-3',
    title: 'Секретные достижения в DLC "Nano Storm"',
    content: 'Нашел 3 скрытых достижения, которых нет в списках...',
    author: 'AchievementHunter',
    authorAvatar: 'swarm-drone-3.png',
    createdAt: '2025-04-17T18:15:00Z',
    commentCount: 8,
  },
  {
    id: 'swp-4',
    title: 'Баланс турелей после патча 1.4.1 - ваши впечатления',
    content: 'Как вам изменения в уроне Plasma Tower? Не кажется ли...',
    author: 'TowerSpecialist',
    authorAvatar: 'swarm-drone-4.png',
    createdAt: '2025-04-18T07:33:00Z',
    commentCount: 31,
  },
]

export const getTopics = async (): Promise<ITopic[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockTopics), 500))
}

export const getTopicById = async (id: string): Promise<ITopic | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockTopics.find(topic => topic.id === id)), 300)
  })
}
