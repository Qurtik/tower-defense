import React, { useRef } from 'react'
import { Button, Flex } from 'antd'
import { SmilePlus } from 'lucide-react'
import styles from './style.module.scss'
import useOutsideClick from '@/shared/hooks/useOutsideClick/useOutsideClick'
import { useTheme } from '@/shared/context/ThemeContext'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface Props {
  commentId: string
}

const EmojiSection = ({ commentId }: Props) => {
  const [emoji, setEmoji] = React.useState<string[]>([])
  const [isPickerOpen, setIsPickerOpen] = React.useState(false)
  const { theme } = useTheme()

  const pickerRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick([pickerRef, buttonRef], () => setIsPickerOpen(false))

  const onEmojiClick = emojiObject => {
    console.log(emojiObject)
    setEmoji(prev => [...prev, emojiObject.native])
    setIsPickerOpen(false)
  }

  const handleEmojiButtonClick = () => {
    setIsPickerOpen(!isPickerOpen)
  }

  return (
    <Flex justify="space-between" style={{ width: '100%' }}>
      <Flex gap={10} wrap="wrap">
        {emoji.length ? (
          emoji.map(emoji => <div key={emoji}>{emoji}</div>)
        ) : (
          <div></div>
        )}
      </Flex>
      <div className={styles.buttonWrapper}>
        {isPickerOpen && (
          <div className={styles.pickerWrapper} ref={pickerRef}>
            <Picker data={data} onEmojiSelect={onEmojiClick} theme={theme} />
          </div>
        )}
        <Button
          style={{ padding: 0 }}
          type="text"
          onClick={handleEmojiButtonClick}
          ref={buttonRef}>
          <SmilePlus />
        </Button>
      </div>
    </Flex>
  )
}

export default EmojiSection
