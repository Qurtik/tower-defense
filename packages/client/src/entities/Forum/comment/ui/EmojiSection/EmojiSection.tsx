import React, { useCallback, useEffect, useRef } from 'react'
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
  EmojiResponse,
} from '@/entities/Forum/comment/ui/EmojiSection/types'
import EmojiCard from '@/entities/Forum/comment/ui/EmojiSection/EmojiCard/EmojiCard'
import { useAppSelector } from '@/shared/hooks/hooksRedux/hooksRedux'
import { selectUser } from '@/entities/User'
import { addEmoji, deleteEmoji, getEmojiByCommentId } from '../../api'

type Props = {
  commentId: number
}

const EmojiSection: React.FC<Props> = ({ commentId }) => {
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

  const emojiListRef = useRef(emojiList)
  useEffect(() => {
    emojiListRef.current = emojiList
  }, [emojiList])

  const toggleEmoji = useCallback(
    async (selectedEmoji: string) => {
      const prevState = emojiListRef.current
      const emojiInList = prevState[selectedEmoji]

      const operation =
        !emojiInList || !emojiInList.pickedByUser ? 'add' : 'remove'

      setEmojiList(prev => {
        if (operation === 'add') {
          const emojiInList = prev[selectedEmoji]
          if (emojiInList) {
            return {
              ...prev,
              [selectedEmoji]: {
                ...emojiInList,
                usersCount: emojiInList.usersCount + 1,
                pickedByUser: true,
              },
            }
          }
          return {
            ...prev,
            [selectedEmoji]: {
              emoji: selectedEmoji,
              usersCount: 1,
              pickedByUser: true,
            },
          }
        } else {
          const emojiInList = prev[selectedEmoji]
          if (!emojiInList) return prev

          if (emojiInList.usersCount === 1) {
            const newList = { ...prev }
            delete newList[selectedEmoji]
            return newList
          }
          return {
            ...prev,
            [selectedEmoji]: {
              ...emojiInList,
              usersCount: emojiInList.usersCount - 1,
              pickedByUser: false,
            },
          }
        }
      })

      try {
        if (operation === 'add') {
          await addEmoji(selectedEmoji, commentId, currentUser!.id)
        } else {
          await deleteEmoji(selectedEmoji, commentId, currentUser!.id)
        }
      } catch (error) {
        // Откат при ошибке
        setEmojiList(prevState)
        console.error('Reaction update failed:', error)
      }
    },
    [commentId]
  )

  useEffect(() => {
    let emojiList: EmojiResponse[]

    const fetchEmoji = async () => {
      getEmojiByCommentId(commentId).then(response => {
        emojiList = response

        const emojiMap: Record<string, EmojiCardItem> = {}
        //  for (const emoji of mockData) {
        for (const emoji of emojiList) {
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
      })
    }

    fetchEmoji()
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
