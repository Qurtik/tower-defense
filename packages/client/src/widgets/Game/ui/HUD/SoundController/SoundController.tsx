import React, { useEffect, useState } from 'react'
import { Button, Flex, Tooltip } from 'antd'
import styles from './SoundController.module.scss'
import { HeadphoneOff, Headphones, Volume2, VolumeOff } from 'lucide-react'
import { soundManager } from '@/widgets/Game/models/SoundManager'
import { LSKeys } from '@/shared/constants/LSKeys'

const SoundController = () => {
  const [music, setMusic] = useState<boolean>(
    !localStorage?.getItem(LSKeys.musicDisabled) || true
  )
  const [sounds, setSounds] = useState<boolean>(
    !localStorage?.getItem(LSKeys.soundsDisabled) || true
  )

  const toggleMusic = () => {
    soundManager.toggleMusic()
    setMusic(!music)
    if (typeof window !== 'undefined') {
      if (music) {
        localStorage.setItem(LSKeys.musicDisabled, 'true')
      } else {
        localStorage.removeItem(LSKeys.musicDisabled)
      }
    }
  }

  const toggleSounds = () => {
    soundManager.toggleSounds()
    setSounds(!sounds)
    if (typeof window !== 'undefined') {
      if (sounds) {
        localStorage.setItem(LSKeys.soundsDisabled, 'true')
      } else {
        localStorage.removeItem(LSKeys.soundsDisabled)
      }
    }
  }

  useEffect(() => {
    return () => {
      soundManager.stopBackgroundMusic()
    }
  }, [])

  return (
    <Flex className={styles.wrapper} vertical gap={5}>
      <Tooltip
        title={music ? 'Выключить музыку' : 'Включить музыку'}
        placement="right">
        <Button onClick={toggleMusic} style={{ padding: 0 }} type="text">
          {music ? <Headphones /> : <HeadphoneOff />}
        </Button>
      </Tooltip>
      <Tooltip
        title={sounds ? 'Выключить звуки' : 'Включить звуки'}
        placement="right">
        <Button onClick={toggleSounds} style={{ padding: 0 }} type="text">
          {sounds ? <Volume2 /> : <VolumeOff />}
        </Button>
      </Tooltip>
    </Flex>
  )
}

export default SoundController
