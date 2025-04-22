import React from 'react'
import { useTheme } from '@/shared/context/ThemeContext'
import { Switch } from 'antd'
import { Themes } from '@/shared/constants/themes'
import { Moon, Sun } from 'lucide-react'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const dynamicPadding = theme === Themes.DARK

  return (
    <Switch
      checked={theme === Themes.DARK}
      onChange={checked => setTheme(checked ? Themes.DARK : Themes.LIGHT)}
      checkedChildren={
        <Moon
          size={20}
          style={{ marginTop: dynamicPadding ? '2px' : '-2px' }}
          color="#000"
        />
      }
      unCheckedChildren={<Sun size={20} color="#e6f0ff" />}
      style={{ display: 'flex', alignItems: 'center' }}
    />
  )
}
