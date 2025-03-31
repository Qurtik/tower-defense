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

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        Component: ProtectedLayout,
        children: [
          {
            path: '/',
            Component: GamePage,
          },
          {
            path: 'profile',
            Component: ProfilePage,
          },
          {
            path: 'leaderboard',
            Component: LeaderboardPage,
          },
          {
            path: 'forum',
            Component: ForumPage,
          },
          {
            path: 'forum/:idTopic',
            Component: TopicPage,
          },
        ],
      },
      {
        Component: PublicLayout,
        children: [
          {
            path: 'login',
            Component: LoginPage,
          },
          {
            path: 'register',
            Component: RegisterPage,
          },
        ],
      },
    ],
  },
])

export default router
