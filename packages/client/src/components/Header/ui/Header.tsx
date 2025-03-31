import React from 'react'
import styles from './Header.module.scss'
import Logo from '../../../assets/images/swarm-logo.png'
import { NavigationLink } from '../../NavigationLink'
import { ThemeSwitcher } from '../../ThemeSwitcher'

export const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={Logo} alt="logo." />
      <nav>
        <ul className={styles.list}>
          <li>
            <NavigationLink to={'/'}>Игра</NavigationLink>
          </li>
          <li>
            <NavigationLink to={'/leaderboard'}>Лидерборд</NavigationLink>
          </li>
          <li>
            <NavigationLink to={'/forum'}>Форум</NavigationLink>
          </li>
          <li>
            <NavigationLink to={'/profile'}>Профиль</NavigationLink>
          </li>
        </ul>
      </nav>
      <ThemeSwitcher />
    </header>
  )
}
