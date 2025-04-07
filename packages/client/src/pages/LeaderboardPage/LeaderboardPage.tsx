import React from 'react'
import { Card } from 'antd'
import style from './LeaderboardPage.module.scss'
import { LeaderboardTable } from '@/entities/Progress/ui/LeaderboardTable'

export const LeaderboardPage = () => {
  return (
    <>
      <Card
        className={style['leaderboard-page']}
        title={
          <span className={style['custom-title']}>Рейтинг пользователей</span>
        }
        extra={<span style={{ color: '#00FF00' }}>Обновлено сегодня</span>}>
        <LeaderboardTable />
      </Card>
    </>
  )
}
