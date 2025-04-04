import React from 'react'
import { useTheme } from '@/shared/context/ThemeContext'
import { Switch } from 'antd'
import { Themes } from '@/shared/constants/themes'
import { Moon, Sun } from 'lucide-react'
import './ThemeSwitcher.module.scss'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Switch
      checked={theme === Themes.DARK}
      onChange={checked => setTheme(checked ? Themes.DARK : Themes.LIGHT)}
      checkedChildren={
        <Moon size={18} style={{ paddingTop: '2px' }} color="#000" />
      }
      unCheckedChildren={
        <Sun size={20} style={{ paddingTop: '1px' }} color="#e6f0ff" />
      }
    />
  )
}
