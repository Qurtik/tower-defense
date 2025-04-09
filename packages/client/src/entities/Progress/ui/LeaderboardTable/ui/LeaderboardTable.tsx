import React, { useState, useEffect } from 'react'
import { Table, Alert, Button, Card } from 'antd'
import style from './LeaderboardTable.module.scss'
import { columns } from '../config/columns'
import { LeaderboardEntry } from '@/entities/Progress/types'
import { leaderboardModel } from '@/entities/Progress/model'

export const LeaderboardTable = () => {
  const [data, setData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const leaderboardData = await leaderboardModel.getLeaderboardData()
      setData(leaderboardData)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchData()
  }, [])

  return (
    <Card
      className={style['leaderboard-card']}
      title={
        <span className={style['custom-title']}>Рейтинг пользователей</span>
      }
      extra={<Button onClick={fetchData}>Обновить таблицу</Button>}>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
          className={style['error']}
        />
      )}
      <Table
        className={style['leaderboard-table']}
        columns={columns}
        dataSource={data}
        rowKey="rank"
        loading={loading}
        pagination={false}
      />
    </Card>
  )
}
