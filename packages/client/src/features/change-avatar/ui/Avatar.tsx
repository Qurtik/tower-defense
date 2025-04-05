import { useEffect, useState } from 'react'
import { Button, Avatar } from 'antd'

import { useUserStore } from '@/entities/User'

import styles from './Avatar.module.scss'

const uploadAvatar = () => {
  const avatarUpload: HTMLElement = document.querySelector('.avatar-upload')!
  avatarUpload.click()
}

export function ChangeAvatar() {
  const [avatar, setAvatar] = useState({
    newAvatar: null as File | null,
    src: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
    isUpdated: false,
  })

  useEffect(() => {
    useUserStore.getUserInfo().then(response => {
      if (response.avatar) {
        setAvatar({
          newAvatar: null,
          src: `https://ya-praktikum.tech/api/v2/resources/${response.avatar}`,
          isUpdated: false,
        })
      }
    })
  }, [])

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        setAvatar({
          newAvatar: file,
          src: reader.result as string,
          isUpdated: true,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarSave = () => {
    if (avatar.newAvatar) {
      useUserStore.changeAvatar(avatar.newAvatar)
    }
  }

  return (
    <div className={styles.avatar}>
      <Avatar size={180} src={avatar.src} onClick={uploadAvatar} />

      <input
        type="file"
        className="avatar-upload"
        name="avatar"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleAvatarChange}
      />

      {avatar.isUpdated && (
        <Button style={{ marginTop: 8 }} onClick={handleAvatarSave}>
          Сохранить
        </Button>
      )}
    </div>
  )
}
