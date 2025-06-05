import { Alert, Button, Card, Table } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { jsonToCsvString, saveDataToFile } from '@/shared/lib/utils/files'

import { LeaderboardEntry } from '@/entities/Progress/types'
import { columns } from '../config/columns'
import { leaderboardModel } from '@/entities/Progress/model'
import style from './LeaderboardTable.module.scss'

export const LeaderboardTable = () => {
  const [data, setData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const leaderboardData = await leaderboardModel.getLeaderboardData()
      setData(
        leaderboardData.sort(
          (a, b) => b.waves - a.waves || b.enemiesKilled - a.enemiesKilled
        )
      )
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const saveTableToFile = () => {
    if (
      !window.File ||
      !window.FileReader ||
      !window.FileList ||
      !window.Blob
    ) {
      alert('File API не поддерживается Вашим браузером')
      return
    } else if (!navigator.geolocation) {
      alert('Geolocation API не поддерживается Вашим браузером')
      return
    }

    let csv = jsonToCsvString(
      data,
      columns.map(c => c.title)
    )

    const successHandler = (position: GeolocationPosition) => {
      csv +=
        'Местоположение пользователя (широта/долгота): ' +
        `${position.coords.latitude}/${position.coords.longitude}`
      saveDataToFile(csv)
    }

    const errHandler = (err: GeolocationPositionError) =>
      alert(`Ошибка при попытке определения местоположения: ${err.message}`)

    navigator.geolocation.getCurrentPosition(successHandler, errHandler)
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
      extra={
        <Fragment>
          <Button onClick={fetchData} loading={loading}>
            Обновить таблицу
          </Button>
          <Button onClick={saveTableToFile}>Сохранить таблицу</Button>
        </Fragment>
      }>
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
