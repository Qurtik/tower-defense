import React from 'react'
import styles from './Header.module.scss'
import Logo from '@/shared/assets/images/swarm-logo.png'
import { NavigationLink } from '@/shared/ui/NavigationLink'
import { ThemeSwitcher } from '@/features/theme-switcher'
import { ROUTES } from '@/shared/constants/routes'
import { useNavigate } from 'react-router'
import { authModel } from '@/entities/user/model'
import { Button } from 'antd'

export const Header = () => {
  const navigate = useNavigate()

  //Временная кнопка пока нет профиля пользователя
  const logout = async () => {
    try {
      await authModel.logout()
      navigate('/login')
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <header className={styles.header}>
      <img className={styles.logo} src={Logo} alt="logo." />
      <nav>
        <ul className={styles.list}>
          <li>
            <NavigationLink to={ROUTES.ROOT} size={'large'}>
              Игра
            </NavigationLink>
          </li>
          <li>
            <NavigationLink to={ROUTES.LEADERBOARD} size={'large'}>
              Лидерборд
            </NavigationLink>
          </li>
          <li>
            <NavigationLink to={ROUTES.FORUM} size={'large'}>
              Форум
            </NavigationLink>
          </li>
          <li>
            <NavigationLink to={ROUTES.PROFILE} size={'large'}>
              Профиль
            </NavigationLink>
          </li>
          <li>
            <Button onClick={logout}>Выход</Button>
          </li>
        </ul>
      </nav>
      <ThemeSwitcher />
    </header>
  )
}
