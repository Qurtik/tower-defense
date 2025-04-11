// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventHandler = (...payload: any) => void

interface IEventBusListener {
  [event: string]: Array<EventHandler>
}

export default class EventBus {
  listeners: IEventBusListener

  constructor() {
    this.listeners = {}
  }

  on(event: string, callback: EventHandler): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off(event: string, callback: EventHandler): void {
    if (!this.listeners[event]) {
      return
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    )
  }

  emit(event: string, ...args: Parameters<EventHandler>) {
    if (!this.listeners[event]) {
      return
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args)
    })
  }
}
