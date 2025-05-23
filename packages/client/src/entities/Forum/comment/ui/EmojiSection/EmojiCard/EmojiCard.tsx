import React from 'react'
import { Button, Card, Flex } from 'antd'
import { EmojiCardItem } from '@/entities/Forum/comment/ui/EmojiSection/types'
import styles from './style.module.scss'
import classNames from 'classnames'

interface EmojiCardProps extends EmojiCardItem {
  onClick: (emoji: string) => void
}

const EmojiCard = ({
  emoji,
  usersCount,
  pickedByUser,
  onClick,
}: EmojiCardProps) => {
  return (
    <Button
      type="text"
      className={styles.button}
      onClick={() => onClick(emoji)}>
      <Card
        variant="borderless"
        className={classNames(pickedByUser && styles.outlined)}
        styles={{ body: { padding: '6px 10px 2px' } }}>
        <Flex gap={5}>
          <span>{emoji}</span>
          <span>{usersCount}</span>
        </Flex>
      </Card>
    </Button>
  )
}

export default EmojiCard
