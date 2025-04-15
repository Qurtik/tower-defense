import { Spin } from 'antd'
import style from './style.module.scss'
import React from 'react'

type optionsProps = {
  delay?: number
  tipLoader?: string
}

export const SpinLoader: React.FC<optionsProps> = ({ delay, tipLoader }) => (
  <div className={style['container-loader']}>
    <Spin size="large" tip={tipLoader} delay={delay}>
      <div className={style['spin-content']} />
    </Spin>
  </div>
)
