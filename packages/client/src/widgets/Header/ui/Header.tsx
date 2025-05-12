import styles from './Header.module.scss'
import Logo from '@/../public/images/swarm-logo.png'
import { NavigationLink } from '@/shared/ui/NavigationLink'
import { ThemeSwitcher } from '@/features/toggle-theme'
import { FullscreenToggleButton } from '@/features/toggle-fullscreen'
import { ROUTES } from '@/shared/constants/routes'
import classNames from 'classnames'

type HeaderProps = {
  isAuthenticated: boolean | null
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  return (
    <header
      className={classNames(
        styles.header,
        !isAuthenticated && styles.header_auth
      )}>
      {isAuthenticated ? (
        <>
          <img className={styles.logo} src={Logo} alt="logo." />
          {
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
              </ul>
            </nav>
          }
          {
            <div className={styles.btn}>
              <ThemeSwitcher />
              <FullscreenToggleButton />
            </div>
          }
        </>
      ) : (
        <img
          className={classNames(
            styles.logo,
            !isAuthenticated && styles.logo_auth
          )}
          src={Logo}
          alt="logo."
        />
      )}
    </header>
  )
}
