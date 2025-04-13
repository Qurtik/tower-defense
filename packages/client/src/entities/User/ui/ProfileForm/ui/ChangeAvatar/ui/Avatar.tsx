import { useEffect, useRef, useState } from 'react'
import { Button, Avatar } from 'antd'
import styles from './Avatar.module.scss'
import { changeAvatar, getResource } from '@/entities/User/model/thunks'
import {
  useAppDispatch,
  useAppSelector,
} from '@/shared/hooks/hooksRedux/hooksRedux'
import { selectPathAvatar } from '@/entities/User/model/selectors'

export function ChangeAvatar(props: {
  onMount: (componentName: string) => void
  onLoad: (componentName: string) => void
  onUnmount: (componentName: string) => void
}) {
  const { onMount, onLoad, onUnmount } = props
  const avatarRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const avatarPath = useAppSelector(selectPathAvatar)
  const [avatar, setAvatar] = useState({
    newAvatar: null as File | null,
    src: `https://api.dicebear.com/7.x/miniavs/svg?seed=1`,
    isUpdated: false,
  })

  useEffect(() => {
    onMount('Avatar')
    const loadAvatar = async () => {
      if (avatarPath) {
        try {
          const response = await dispatch(getResource(avatarPath)).unwrap()
          setAvatar(prev => ({
            ...prev,
            src: response,
          }))
        } catch (error) {
          console.error('Failed to load avatar:', error)
        }
      }
      onLoad('Avatar')
    }

    loadAvatar()

    return () => {
      onUnmount('Avatar')
      if (avatar.src.startsWith('blob:')) {
        URL.revokeObjectURL(avatar.src)
      }
    }
  }, [avatarPath, dispatch])

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
      dispatch(changeAvatar(avatar.newAvatar))
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
