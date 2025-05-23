export interface EmojiPickerData {
  id: string
  name: string
  native: string
  unified: string
  keywords: string[]
  shortcodes: string
  skin?: number
  emoticons?: string[]
}

export interface EmojiResponse {
  id: number
  authorId: number
  emoji: string
}

export interface EmojiCardItem {
  emoji: string
  usersCount: number
  pickedByUser?: boolean
}
