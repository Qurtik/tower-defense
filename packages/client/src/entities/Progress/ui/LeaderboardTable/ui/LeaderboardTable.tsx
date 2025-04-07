import React, { useState, useEffect } from 'react'
import { Table, Alert } from 'antd'
import style from './LeaderboardTable.module.scss'
import { useLeaderboardData } from '@/entities/Progress/model'
import { columns } from '../config/columns'
import { LeaderboardEntry } from '@/entities/Progress/types'

export const LeaderboardTable = () => {
  const [data, setData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardData = await useLeaderboardData()
        setData(leaderboardData)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
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
    </>
  )
}
