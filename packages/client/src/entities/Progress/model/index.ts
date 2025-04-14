import { LeaderboardEntry } from '../types'
import { leaderboardApi } from '../api'

class LeaderboardModel {
  private _api: typeof leaderboardApi

  constructor() {
    this._api = leaderboardApi
  }

  async getLeaderboardData(): Promise<LeaderboardEntry[]> {
    try {
      // Пока используем mock
      // const response = await this._api.fetchLeaderboardData();
      // return response;

      return [
        { rank: 1, name: 'Игрок 1', waves: 50, score: 5000 },
        { rank: 2, name: 'Игрок 2', waves: 45, score: 4500 },
        { rank: 3, name: 'Игрок 3', waves: 40, score: 4000 },
      ]
    } catch (error) {
      console.error('Error fetching leaderboard data:', error)
      throw new Error('Не удалось загрузить данные')
    }
  }

  async getUserRank(userId: number): Promise<LeaderboardEntry | null> {
    return this._api.fetchUserRank(userId)
  }
}

export const leaderboardModel = new LeaderboardModel()
