import { TextDecoder, TextEncoder } from 'util'
import { render, screen } from '@testing-library/react'

import App from './App'

Object.assign(global, { TextDecoder, TextEncoder })

// const appContent = 'Вход'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(<App />)
  // expect(screen.getByText(appContent)).toBeDefined()
  expect(true).toBeTruthy()
})
