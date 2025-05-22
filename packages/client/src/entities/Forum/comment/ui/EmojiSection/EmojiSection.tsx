import React, { useEffect, useRef } from 'react'
import { Button, Flex } from 'antd'
import { SmilePlus } from 'lucide-react'
import styles from './style.module.scss'
import useOutsideClick from '@/shared/hooks/useOutsideClick/useOutsideClick'
import { useTheme } from '@/shared/context/ThemeContext'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {
  EmojiPickerData,
  EmojiCardItem,
} from '@/entities/Forum/comment/ui/EmojiSection/types'
import EmojiCard from '@/entities/Forum/comment/ui/EmojiSection/EmojiCard/EmojiCard'
import { mockData } from '@/entities/Forum/comment/ui/EmojiSection/mockData'
import { useAppSelector } from '@/shared/hooks/hooksRedux/hooksRedux'
import { selectUser } from '@/entities/User'

const EmojiSection = () => {
  const [emojiList, setEmojiList] = React.useState<
    Record<string, EmojiCardItem>
  >({})
  const [isPickerOpen, setIsPickerOpen] = React.useState(false)
  const { theme } = useTheme()

  const currentUser = useAppSelector(selectUser)

  const pickerRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick([pickerRef, buttonRef], () => setIsPickerOpen(false))

  const onEmojiPickerClick = (emojiObject: EmojiPickerData) => {
    toggleEmoji(emojiObject.native)
    setIsPickerOpen(false)
  }

  const handleEmojiButtonClick = () => {
    setIsPickerOpen(!isPickerOpen)
  }

  const toggleEmoji = (selectedEmoji: string) => {
    const emojiInList = emojiList[selectedEmoji]
    if (!emojiInList) {
      setEmojiList(prev => ({
        ...prev,
        [selectedEmoji]: {
          emoji: selectedEmoji,
          usersCount: 1,
          pickedByUser: true,
        },
      }))
    } else {
      if (emojiInList.pickedByUser) {
        if (emojiInList.usersCount > 1) {
          setEmojiList(prev => ({
            ...prev,
            [selectedEmoji]: {
              emoji: selectedEmoji,
              usersCount: --emojiInList.usersCount,
              pickedByUser: false,
            },
          }))
        } else {
          const { [selectedEmoji]: _, ...rest } = emojiList
          setEmojiList(rest)
        }
      } else {
        setEmojiList(prev => ({
          ...prev,
          [selectedEmoji]: {
            emoji: selectedEmoji,
            usersCount: ++emojiInList.usersCount,
            pickedByUser: true,
          },
        }))
      }
    }
  }

  useEffect(() => {
    const emojiMap: Record<string, EmojiCardItem> = {}
    for (const emoji of mockData) {
      if (emojiMap[emoji.emoji]) {
        emojiMap[emoji.emoji].usersCount++
      } else {
        emojiMap[emoji.emoji] = {
          emoji: emoji.emoji,
          usersCount: 1,
          pickedByUser: false,
        }
      }

      if (emoji.authorId === currentUser?.id) {
        emojiMap[emoji.emoji].pickedByUser = true
      }
    }

    setEmojiList(emojiMap)
  }, [])

  return (
    <Flex justify="space-between" className={styles.wrapper}>
      <Flex gap={10} wrap="wrap">
        {Object.values(emojiList).length ? (
          Object.values(emojiList).map(
            ({ emoji, usersCount, pickedByUser }) => (
              <EmojiCard
                key={emoji}
                emoji={emoji}
                usersCount={usersCount}
                pickedByUser={pickedByUser}
                onClick={toggleEmoji}
              />
            )
          )
        ) : (
          <div></div>
        )}
      </Flex>
      <div className={styles.buttonWrapper}>
        {isPickerOpen && (
          <div className={styles.pickerWrapper} ref={pickerRef}>
            <Picker
              data={data}
              onEmojiSelect={onEmojiPickerClick}
              theme={theme}
            />
          </div>
        )}
        <Button
          className={styles.button}
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
