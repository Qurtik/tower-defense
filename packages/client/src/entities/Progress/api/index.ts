import httpService from '@/shared/api/httpService'
import handleApiError from '@/shared/api/handleApiError'
import { LeaderboardEntry } from '../types'

class LeaderboardApi {
  private _baseUrl = '/leaderboard'

  async fetchLeaderboardData(): Promise<LeaderboardEntry[]> {
    try {
      const response = await httpService.get<LeaderboardEntry[]>(this._baseUrl)
      return response.data
    } catch (error) {
      handleApiError(error)
    }
  }

  async fetchUserRank(userId: number): Promise<LeaderboardEntry | null> {
    try {
      const response = await httpService.get<LeaderboardEntry>(
        `${this._baseUrl}/${userId}`
      )
      return response.data
    } catch (error) {
      handleApiError(error)
    }
  }
}

export const leaderboardApi = new LeaderboardApi()
