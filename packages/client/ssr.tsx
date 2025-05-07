import { reducer } from '@/app/store/store'
import { configureStore } from '@reduxjs/toolkit'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { Request as ExpressRequest } from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router'
import { routes } from '@/app/providers/routes/routes.tsx'
import { createFetchRequest } from '@/shared/lib/utils/ssr.ts'
import { getUserInfo } from '@/entities/User'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes)

  const fetchRequest = createFetchRequest(req)

  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const store = configureStore({
    reducer,
  })

  await store.dispatch(getUserInfo())

  const router = createStaticRouter(dataRoutes, context)

  return {
    html: ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    ),
    initialState: store.getState(),
  }
}
