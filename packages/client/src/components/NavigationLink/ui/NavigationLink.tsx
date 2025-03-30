import React from 'react'
import { NavLink } from 'react-router'
import styles from './NavigationLink.module.scss'
import classNames from 'classnames'
import { Typography } from 'antd'

interface Props {
  to: string
  children: string
}

export const NavigationLink = ({ to, children }: Props) => {
  const { Text } = Typography

  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Text
          className={classNames(styles.link, {
            [styles.link_active]: isActive,
          })}>
          {children}
        </Text>
      )}
    </NavLink>
  )
}
