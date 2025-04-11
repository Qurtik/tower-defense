const STATIC_CACHE_NAME = 'static__if-network-else-cache'
const DYNAMIC_CACHE_NAME = 'dynamic__if-network-else-cache'

const MANIFEST_URL = './dist/manifest.json'

const URLS = ['/', './dist/index.html', './dist/favicon.svg']

type chunk = {
  file: string
  isDynamic?: boolean
  isEntry?: boolean
  imports?: string[]
  css?: string[]
  assets?: string[]
  dynamicImports?: string[]
  isDynamicEntry?: boolean
  src?: string
}

this.addEventListener('install', event => {
  // гарантирует, что сервис-воркер не будет установлен, пока код, переданный внутри waitUntil(), не завершится с успехом
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then(async cache => {
        const response = await fetch(MANIFEST_URL)
        const manifest: Record<string, chunk> = await response.json()

        const assets: string[] = Object.values(manifest).map(
          entry => `./dist/${entry.file}`
        )

        return cache.addAll(URLS.concat(assets))
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  )
})

this.addEventListener('activate', function (event) {
  console.log(`activate`)

  //   this.self.clients.claim()

  // Удаляем кеши, которые не совпадают с STATIC_CACHE_NAME
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== STATIC_CACHE_NAME)
          .map(cacheName => {
            console.log(`Deleting cache: ${cacheName}`)
            caches.delete(cacheName)
          })
      )
    })
  )
})

this.addEventListener('fetch', event => {
  event.respondWith(
    // Пытаемся найти ответ на такой запрос в кеше
    caches.match(event.request).then(response => {
      // Если ответ найден, выдаём его
      if (response) {
        return response
      }

      const fetchRequest = event.request.clone()
      // В противном случае делаем запрос на сервер
      return (
        fetch(fetchRequest)
          // Можно задавать дополнительные параметры запроса, если ответ вернулся некорректный.
          .then(response => {
            // Если что-то пошло не так, выдаём в основной поток результат, но не кладём его в кеш
            if (
              !response ||
              response.status !== 200 ||
              response.type !== 'basic'
            ) {
              return response
            }

            const responseToCache = response.clone()
            // Получаем доступ к кешу по DYNAMIC_CACHE_NAME
            caches.open(DYNAMIC_CACHE_NAME).then(cache => {
              // Записываем в кеш ответ, используя в качестве ключа запрос
              cache.put(event.request, responseToCache)
            })
            // Отдаём в основной поток ответ
            return response
          })
      )
    })
  )
})

// this.addEventListener('message', event => {
//   const data = event.data
//   if (data.command == 'oneWayCommunication') {
//     console.log('Message from the Page : ', data.message)
//   }
//   console.log(`Message received: ${JSON.stringify(event.data)}`)
// })
