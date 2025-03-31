import { createContext, useContext } from 'react'
import { Themes } from '../types/themes'

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

export const useTheme = () => useContext(ThemeContext)
