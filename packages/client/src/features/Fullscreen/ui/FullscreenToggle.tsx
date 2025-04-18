import React, { useEffect, useState } from 'react'
import { Button, Tooltip } from 'antd'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import styles from './FullscreenToggle.module.scss'

export const FullscreenToggleButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const onFullscreenChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  }

  return (
    <Tooltip
      title={isFullscreen ? 'Выйти из полноэкранного режима' : 'Во весь экран'}>
      <Button
        type="text"
        onClick={toggleFullscreen}
        className={styles.btn}
        aria-label={
          isFullscreen ? 'Выйти из полноэкранного режима' : 'Во весь экран'
        }>
        {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      </Button>
    </Tooltip>
  )
}
