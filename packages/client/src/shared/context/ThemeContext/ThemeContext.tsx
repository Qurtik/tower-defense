import { createContext } from 'react'
import { Themes } from '@/shared/constants/themes'

type ThemeContextType = {
  theme: Themes
  setTheme: (theme: Themes) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: Themes.LIGHT,
  setTheme: () => {
    console.warn('no context provider')
  },
})
