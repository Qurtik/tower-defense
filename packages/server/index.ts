import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
dotenv.config()

import express, { Request as ExpressRequest } from 'express'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import serialize from 'serialize-javascript'
// import { createClientAndConnect } from './db'

dotenv.config({ path: path.resolve(__dirname, '../../.env.sample') })
const isDev = () => process.env.NODE_ENV === 'development'
console.log(`NODE_ENV:${process.env.NODE_ENV}`)
console.log(isDev())

if (isDev()) {
  console.log('Dev mode')
} else {
  console.log('Prod mode')
}

async function startServer() {
  console.log('  ➜ 🎸 Starting server...')

  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer | undefined
  const distPath = path.dirname(require.resolve(`client/dist/index.html`))
  const srcPath = path.dirname(require.resolve(`client/package.json`))
  const ssrClientPath = require.resolve(`client/ssr-dist/client.cjs`)

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  // createClientAndConnect()

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

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
