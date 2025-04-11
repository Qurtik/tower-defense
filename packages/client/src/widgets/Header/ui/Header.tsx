import React from 'react'
import styles from './Header.module.scss'
import Logo from '@/shared/assets/images/swarm-logo.png'
import { NavigationLink } from '@/shared/ui/NavigationLink'
import { ThemeSwitcher } from '@/features/theme-switcher'
import { ROUTES } from '@/shared/constants/routes'

type HeaderProps = {
  isAuthenticated: boolean | null
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={Logo} alt="logo." />
      <nav>
        {isAuthenticated && (
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
          </ul>
        )}
      </nav>
      <ThemeSwitcher />
    </header>
  )
}
