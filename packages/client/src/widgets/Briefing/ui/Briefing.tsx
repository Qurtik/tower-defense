import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { Card, Typography } from 'antd'
import styles from './Briefing.module.scss'
import { briefingText } from '@/widgets/Briefing/data'

const { Text } = Typography

export const Briefing = () => {
  const typedRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!typedRef.current) return

    const typed = new Typed(typedRef.current, {
      strings: [briefingText],
      typeSpeed: 30,
      showCursor: true,
      cursorChar: '▌',
      contentType: 'html',
    })

    return () => typed.destroy()
  }, [])

  return (
    <Card style={{ minHeight: '100%' }}>
      <Text ref={typedRef} className={styles.typedText} />
    </Card>
  )
}
