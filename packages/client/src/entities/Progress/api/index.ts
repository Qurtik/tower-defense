import httpService from '@/shared/api/httpService'
import { LeaderboardData } from '../types'

const TEAM_NAME = 'ScriptSquad'
const RATING_FIELD_NAME = 'waves'

export const leaderboardApi = {
  async addResult(data: LeaderboardData) {
    return httpService.post('api/v2/leaderboard', {
      data,
      ratingFieldName: RATING_FIELD_NAME,
      teamName: TEAM_NAME,
    })
  },

  async getLeaderboard(cursor = 0, limit = 10) {
    return httpService.post(`api/v2/leaderboard/${TEAM_NAME}`, {
      ratingFieldName: RATING_FIELD_NAME,
      cursor,
      limit,
    })
  },
}
