import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { Card, Typography } from 'antd'
import styles from './Briefing.module.scss'

const { Text } = Typography

export const Briefing = () => {
  const typedRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!typedRef.current) return

    const briefingText = [
      '[Загрузка протокола «РОЙ»... Доступ разрешён]\n\n',
      '*Командующий, это Центр Контроля Заражения.*\n\n',
      'Активирован Чрезвычайный Протокол «РОЙ». ',
      'Обнаружены сигнатуры ксеноморфных форм. ',
      'Рой стремительно разрастается.\n\n',
      '  ВАЖНО:\n',
      '  - Заражение: 82% территории\n',
      '  - Цель: Удержать позицию до прибытия подкрепления\n',
      '  - Ресурсы: ОГРАНИЧЕНЫ\n\n',
      '*Ваша база — последний рубеж перед сектором «Омега».*\n\n',
      'Используйте улучшения стратегически —\n',
      'каждый процент эффективности на счету.\n\n',
      '[Автономный режим через 5... 4... 3...]',
    ].join('')

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
