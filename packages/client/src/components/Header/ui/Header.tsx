import React from 'react'
import styles from './Header.module.scss'
import Logo from '../../../assets/images/swarm-logo.png'
import { NavigationLink } from '../../NavigationLink'
import { ThemeSwitcher } from '../../ThemeSwitcher'
import { ROUTES } from '../../../routes/RouteConfig'

export const Header = () => {
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
        </ul>
      </nav>
      <ThemeSwitcher />
    </header>
  )
}
