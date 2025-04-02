import React from 'react'
import styles from './Header.module.scss'
import Logo from '../../../assets/images/swarm-logo.png'
import { NavigationLink } from '../../NavigationLink'
import { ThemeSwitcher } from '../../ThemeSwitcher'
import { ROUTES } from '../../../routes/RouteConfig'
import { Button } from 'antd'
import { authModel } from '../../../entities/user/model/authModel'
import { useNavigate } from 'react-router'

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
            <NavigationLink to={ROUTES.ROOT}>Игра</NavigationLink>
          </li>
          <li>
            <NavigationLink to={ROUTES.LEADERBOARD}>Лидерборд</NavigationLink>
          </li>
          <li>
            <NavigationLink to={ROUTES.FORUM}>Форум</NavigationLink>
          </li>
          <li>
            <NavigationLink to={ROUTES.PROFILE}>Профиль</NavigationLink>
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
