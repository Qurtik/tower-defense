import { render, screen } from '@testing-library/react'

import { LoginForm } from './LoginForm'
import { MemoryRouter } from 'react-router'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

test('Login form test', async () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  )
  const appContent = 'Еще нет регистрации?!'
  const el = screen.getByText(appContent)
  expect(el).toBeInTheDocument()
})
