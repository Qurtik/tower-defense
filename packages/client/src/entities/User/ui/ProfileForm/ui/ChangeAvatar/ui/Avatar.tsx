import { useEffect, useRef, useState } from 'react'
import { Button, Avatar } from 'antd'
import styles from './Avatar.module.scss'

import { useUserModel } from '@/entities/User'

export function ChangeAvatar(props: {
  onMount: (componentName: string) => void
  onLoad: (componentName: string) => void
  onUnmount: (componentName: string) => void
}) {
  const { onMount, onLoad, onUnmount } = props

  const avatarRef = useRef<HTMLInputElement>(null)

  const [avatar, setAvatar] = useState({
    newAvatar: null as File | null,
    src: '',
    isUpdated: false,
  })

  useEffect(() => {
    onMount('Avatar')
    useUserModel
      .getUserInfo()
      .then(response => {
        if (response.avatar) {
          setAvatar({
            newAvatar: null,
            src: `https://ya-praktikum.tech/api/v2/resources/${response.avatar}`,
            isUpdated: false,
          })
        } else {
          setAvatar({
            newAvatar: null,
            src: `https://api.dicebear.com/7.x/miniavs/svg?seed=1`,
            isUpdated: false,
          })
        }
      })
      .finally(() => {
        onLoad('Avatar')
      })

    return onUnmount('Avatar')
  }, [])

  const handleAvatarClick = () => {
    if (avatarRef.current) {
      avatarRef.current.click()
    }
  }

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
      useUserModel.changeAvatar(avatar.newAvatar)
    }
  }

  return (
    <div className={styles.avatar}>
      <Avatar size={180} src={avatar.src} onClick={handleAvatarClick} />
      <input
        type="file"
        className="avatar-upload"
        name="avatar"
        ref={avatarRef}
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
