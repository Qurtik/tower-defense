import { Button } from 'antd'
import { useNavigate } from 'react-router'

import {
  useAppDispatch,
  useAppSelector,
} from '@/shared/hooks/hooksRedux/hooksRedux'
import { logout } from '@/entities/User/model/thunks'
import { ROUTES } from '@/shared/constants/routes'
import { selectIsLoggingOut } from '@/entities/User/model/selectors'

//Временная кнопка пока нет профиля пользователя
export const Logout = ({ text = 'Выход' }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectIsLoggingOut)
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap()
      navigate(ROUTES.LOGIN)
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <Button onClick={handleLogout} loading={loading} disabled={loading}>
      {!loading && text}
    </Button>
  )
}
