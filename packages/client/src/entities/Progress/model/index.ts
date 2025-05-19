import { LeaderboardEntry, LeaderboardData } from '../types'
import { leaderboardApi } from '../api'

class LeaderboardModel {
  async sendUserResult(data: LeaderboardData) {
    await leaderboardApi.addResult(data)
  }

  async getLeaderboardData(): Promise<LeaderboardEntry[]> {
    const response = await leaderboardApi.getLeaderboard(0, 10)
    return response.data.map(
      (entry: { data: LeaderboardData }, idx: number) => ({
        rank: idx + 1,
        ...entry.data,
      })
    )
  }
}

export const leaderboardModel = new LeaderboardModel()
