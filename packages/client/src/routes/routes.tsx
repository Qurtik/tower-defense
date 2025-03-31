import { createBrowserRouter } from 'react-router'
import { GamePage } from '../pages/GamePage/GamePage'
import { ProfilePage } from '../pages/ProfilePage/ProfilePage'
import { MainLayout } from '../layout/MainLayout/MainLayout'
import { ErrorPage } from '../pages/ErrorPage/ErrorPage'
import { ProtectedLayout } from '../layout/ProtectedLayout/ProtectedLayout'
import { PublicLayout } from '../layout/PublicLayout/PublicLayout'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { RegisterPage } from '../pages/RegisterPage/RegisterPage'
import { ForumPage } from '../pages/ForumPage/ForumPage'
import { LeaderboardPage } from '../pages/LeaderboardPage/LeaderboardPage'
import { TopicPage } from '../pages/TopicPage/TopicPage'
import { ROUTES } from './RouteConfig'

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        Component: ProtectedLayout,
        children: [
          {
            path: ROUTES.ROOT,
            Component: GamePage,
          },
          {
            path: ROUTES.PROFILE,
            Component: ProfilePage,
          },
          {
            path: ROUTES.LEADERBOARD,
            Component: LeaderboardPage,
          },
          {
            path: ROUTES.FORUM,
            Component: ForumPage,
          },
          {
            path: ROUTES.TOPIC,
            Component: TopicPage,
          },
        ],
      },
      {
        Component: PublicLayout,
        children: [
          {
            path: ROUTES.LOGIN,
            Component: LoginPage,
          },
          {
            path: ROUTES.REGISTER,
            Component: RegisterPage,
          },
        ],
      },
    ],
  },
])

export default router
