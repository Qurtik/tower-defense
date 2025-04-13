import { useEffect, useRef, useState } from 'react'
import { Button, Avatar, Spin } from 'antd'
import styles from './Avatar.module.scss'
import { changeAvatar, getResource } from '@/entities/User/model/thunks'
import {
  useAppDispatch,
  useAppSelector,
} from '@/shared/hooks/hooksRedux/hooksRedux'
import {
  selectAuthLoading,
  selectPathAvatar,
} from '@/entities/User/model/selectors'

export function ChangeAvatar() {
  const avatarRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const avatarPath = useAppSelector(selectPathAvatar)
  const [avatar, setAvatar] = useState({
    newAvatar: null as File | null,
    src: `https://api.dicebear.com/7.x/miniavs/svg?seed=1`,
    isUpdated: false,
  })
  const isLoading = useAppSelector(selectAuthLoading)
  const [isAvatarLoading, setIsAvatarLoading] = useState(true)

  useEffect(() => {
    const loadAvatar = async () => {
      setIsAvatarLoading(true)
      if (avatarPath) {
        try {
          const response = await dispatch(getResource(avatarPath)).unwrap()
          setAvatar(prev => ({
            ...prev,
            src: response,
          }))
        } catch (error) {
          console.error('Failed to load avatar:', error)
        } finally {
          setIsAvatarLoading(false)
        }
      }
    }

    loadAvatar()
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
      <Spin spinning={isAvatarLoading || isLoading} delay={300}>
        <Avatar
          size={180}
          src={avatar.src}
          onClick={handleAvatarClick}
          style={{
            opacity: isAvatarLoading ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        />
      </Spin>
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
