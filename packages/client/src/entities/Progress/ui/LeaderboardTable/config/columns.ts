import { LeaderboardEntry } from '@/entities/Progress/types'

export interface ILeaderboardColumn {
  title: string
  dataIndex: keyof LeaderboardEntry
  key: string
}

export const columns: ILeaderboardColumn[] = [
  {
    title: 'Ранг',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Количество волн',
    dataIndex: 'waves',
    key: 'waves',
  },
  {
    title: 'Убито врагов',
    dataIndex: 'enemiesKilled',
    key: 'enemiesKilled',
  },
]
