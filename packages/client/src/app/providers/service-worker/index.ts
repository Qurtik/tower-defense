export function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('../../service-worker')
        .then(registration => {
          registration.active?.postMessage(
            'Test message sent immediately after creation'
          )
          console.log(`Service Worker registered, scope: ${registration.scope}`)
        })
        .catch(error => {
          console.log(`Service Worker registration failed, error: ${error}`)
        })
    })
  }
}
