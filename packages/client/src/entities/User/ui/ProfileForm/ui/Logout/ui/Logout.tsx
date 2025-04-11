import { Button } from 'antd'
import { useNavigate } from 'react-router'

import { useAppDispatch } from '@/shared/hooks/hooksRedux/hooksRedux'
import { logout } from '@/entities/User/model/thunks'

//Временная кнопка пока нет профиля пользователя
export const Logout = ({ text = 'Выход' }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      await dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.warn(error)
    }
  }

  return <Button onClick={handleLogout}>{text}</Button>
}
