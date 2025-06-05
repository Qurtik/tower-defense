import React, { useEffect, useState } from 'react'
import { Button, Flex, Tooltip } from 'antd'
import styles from './SoundController.module.scss'
import { HeadphoneOff, Headphones, Volume2, VolumeOff } from 'lucide-react'
import { SoundManager } from '@/widgets/Game/models/SoundManager'
import { LSKeys } from '@/shared/constants/LSKeys'

const SoundController = () => {
  const [music, setMusic] = useState(
    !localStorage.getItem(LSKeys.musicDisabled)
  )
  const [sounds, setSounds] = useState(
    !localStorage.getItem(LSKeys.soundsDisabled)
  )

  const toggleMusic = () => {
    SoundManager.getInstance().toggleMusic()
    setMusic(!music)
    if (music) {
      localStorage.setItem(LSKeys.musicDisabled, 'true')
    } else {
      localStorage.removeItem(LSKeys.musicDisabled)
    }
  }

  const toggleSounds = () => {
    SoundManager.getInstance().toggleSounds()
    setSounds(!sounds)
    if (sounds) {
      localStorage.setItem(LSKeys.soundsDisabled, 'true')
    } else {
      localStorage.removeItem(LSKeys.soundsDisabled)
    }
  }

  useEffect(() => {
    return () => {
      SoundManager.getInstance().stopBackgroundMusic()
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
