import { createBrowserRouter } from 'react-router'

import { ProtectedLayout } from '@/app/providers/layout'
import { MainLayout } from '@/app/providers/layout'
import { PublicLayout } from '@/app/providers/layout'

import { GamePage } from '@/pages/GamePage/GamePage'
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage'
import { ErrorPage } from '@/pages/ErrorPage/ErrorPage'
import { LoginPage } from '@/pages/LoginPage/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage/RegisterPage'
import { LeaderboardPage } from '@/pages/LeaderboardPage/LeaderboardPage'

import { ROUTES } from '@/shared/constants/routes'
import {
  TopicCreatePage,
  TopicDetailPage,
  TopicListPage,
} from '@/pages/ForumPage'

export const routes = [
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
            Component: TopicListPage,
          },
          {
            path: ROUTES.TOPIC_CREATE,
            Component: TopicCreatePage,
          },
          {
            path: ROUTES.TOPIC,
            Component: TopicDetailPage,
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
]
