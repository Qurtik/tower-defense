import { render, screen } from '@testing-library/react'

import { LoginForm } from './LoginForm'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from '@/app/store/store'

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

describe('Login form', () => {
  test('Рендерится корректно', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginForm />
        </Provider>
      </MemoryRouter>
    )

    const submitElem = screen.getByRole('link')
    expect(submitElem).toBeInTheDocument()

    const regContent = 'Еще нет регистрации?!'
    const elReg = screen.getByText(regContent)
    expect(elReg).toBeInTheDocument()
  })
})
