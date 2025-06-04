import { ViteDevServer, createServer as createViteServer } from 'vite'
import express, { Request as ExpressRequest } from 'express'

import { commentRouter } from './src/features/comment'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { createClientAndConnect } from './src/app/config/db'
import { createProxyMiddleware } from 'http-proxy-middleware'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { requireAuth } from './src/app/middlewares/auth'
import serialize from 'serialize-javascript'
import { themeRouter } from './src/features/theme'
import { topicRouter } from './src/features/topic'
import { userRouter } from './src/features/user'

dotenv.config()

dotenv.config({ path: path.resolve(__dirname, '../../.env.sample') })
const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()

  app.use(
    cors({
      credentials: true,
    })
  )

  app.use(
    createProxyMiddleware({
      target: 'https://ya-praktikum.tech',
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      pathFilter: '/api/v2',
    })
  )

  app.use(cookieParser())

  await createClientAndConnect()

  app.use(express.json())
  app.use('/forum/topics', requireAuth, topicRouter)
  app.use('/forum/comments', requireAuth, commentRouter)
  app.use('/users', requireAuth, userRouter)
  app.use('/themes', themeRouter)

  const port = Number(process.env.SERVER_PORT) || 3000

  let vite: ViteDevServer | undefined

  let distPath: string, srcPath: string, ssrClientPath: string

  if (isDev()) {
    distPath = path.dirname(require.resolve(`client/dist/index.html`))
    srcPath = path.dirname(require.resolve(`client/package.json`))
    ssrClientPath = require.resolve(`client/ssr-dist/client.cjs`)
  } else {
    distPath = path.dirname(`./client/dist/index.html`)
    srcPath = path.dirname(`./client/package.json`)
    ssrClientPath = require.resolve(`./client/ssr-dist/client.cjs`)
  }

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (
        req: ExpressRequest
      ) => Promise<{ html: string; initialState: unknown }>

      if (!isDev()) {
        render = (await import(ssrClientPath)).render
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render
      }

      const { html: appHtml, initialState } = await render(req)

      const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(
        `<!--ssr-initial-state-->`,
        `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
          isJSON: true,
        })}</script>`
      )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port - game: ${port}`)
  })
}

startServer()
