import { Button } from 'antd'
import { NavigateFunction, useNavigate } from 'react-router'

import { authModel } from '@/entities/User'

async function logout(navigate: NavigateFunction) {
  try {
    await authModel.logout()
    navigate('/login')
  } catch (error) {
    console.warn(error)
  }
}

//Временная кнопка пока нет профиля пользователя
export const Logout = ({ text = 'Выход' }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout(navigate)
  }

  return <Button onClick={handleLogout}>{text}</Button>
}
