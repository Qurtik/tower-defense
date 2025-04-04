import React from 'react'
import styles from './Background.module.scss'
import classNames from 'classnames'
import { useTheme } from '@/shared/context/ThemeContext'
import { Themes } from '@/shared/constants/themes'

const Background = () => {
  const { theme } = useTheme()

  const isLight = theme === Themes.LIGHT

  return (
    <div
      className={classNames(styles.space, {
        [styles.space_light]: isLight,
      })}>
      <div
        className={classNames(styles.stars, {
          [styles.stars_light]: isLight,
        })}></div>
      <div
        className={classNames(styles.stars, styles.stars2, {
          [styles.stars2_light]: isLight,
        })}></div>
      <div className={classNames(styles.stars, styles.stars3)}></div>
      <div className={classNames(styles.meteor, styles.meteor1)}></div>
      <div
        className={classNames(styles.meteor, styles.meteor2, {
          [styles.meteor_light]: isLight,
        })}></div>
      <div className={classNames(styles.meteor, styles.meteor3)}></div>
    </div>
  )
}

export default Background
