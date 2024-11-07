import type { StaticImageData } from 'next/image'
import type { IconType } from 'react-icons'
import type { BootstrapVariantType } from './component'
import type { ReactNode } from 'react'

type IdType = string

export type ProfilePanelLink = {
  image: StaticImageData
  name: string
  link: string
}

export type UserType = {
  id: IdType
  name: string
  avatar: StaticImageData
  isStory?: boolean
  mutualCount: number
  hasRequested?: boolean
  role: string
  status: 'online' | 'offline'
  lastMessage: string
  lastActivity: Date
}

export type CommentType = {
  id: IdType
  postId: SocialPostType['id']
  socialUserId: UserType['id']
  socialUser?: UserType
  replyTo?: CommentType['id']
  comment: string
  likesCount: number
  image?: StaticImageData
  createdAt: Date
  children?: CommentType[]
}

export type SocialPostType = {
  id: IdType
  socialUserId: UserType['id']
  image?: StaticImageData
  socialUser?: UserType
  caption?: string
  createdAt: Date
  likesCount: number
  commentsCount?: number
  liked?: boolean
  comments?: CommentType[]
  photos?: StaticImageData[]
  isVideo?: boolean
  isSponsored?: boolean
}

export type VideoType = {
  id: IdType
  userId: UserType['id']
  user?: UserType
  title: string
  isVerified?: boolean
  image?: StaticImageData
  iframe?: string
  time?: string
  views: string
  isVideoPlayer?: boolean
  uploadTime?: Date
}

export type ChatMessageType = {
  id: IdType
  from: UserType
  to: UserType
  message: string
  sentOn: Date
  image?: StaticImageData
  isRead?: boolean
  isSend?: boolean
}

export type EventType = {
  id: IdType
  title: string
  category: string
  image: StaticImageData
  label?: string
  date: Date
  type: 'local' | 'this-week' | 'online' | 'friends' | 'following'
  location: string
  attendees: StaticImageData[]
}

export type GroupType = {
  id: IdType
  image: StaticImageData
  logo: StaticImageData
  name: string
  type: 'Public' | 'Private'
  ppd: number
  members: StaticImageData[]
  memberCount: string
  isJoin?: boolean
}

export type FooterLinksType = {
  title: string
  items: {
    icon?: IconType
    label: string
    url?: string
  }[]
}

export type ConnectionsType = {
  id: IdType
  userId: UserType['id']
  user?: UserType
  role: string
  sharedConnectionAvatars?: StaticImageData[]
  description: string
}

export type MediaType = {
  id: IdType
  title?: string
  count?: number
  image: StaticImageData
  likes: number
  comments: number
  time: string
}

export type ScheduleType = {
  id: IdType
  userId: UserType['id']
  date: Date
  description: string
  title: string
  speakerId: UserType['id'][]
  speakers?: (UserType | undefined)[]
  user?: UserType
}

export type BlogType = {
  id: IdType
  image: StaticImageData
  category: string
  categoryVariant: BootstrapVariantType
  title: string
  description: string
  date: Date
}

export type CelebrationType = {
  id: IdType
  userId: UserType['id']
  user?: UserType
  textAvatar?: {
    variant: BootstrapVariantType
    text: string
  }
  placeholder?: string
  title: ReactNode
  isEvent?: boolean
}

export type NotificationType = {
  id: IdType
  title: string
  description?: ReactNode
  avatar?: StaticImageData
  textAvatar?: {
    text: string
    variant: BootstrapVariantType
  }
  time: Date
  isFriendRequest?: boolean
  isRead?: boolean
}

export type PostType = {
  id: IdType
  image?: StaticImageData
  category: 'for-you' | 'covid' | 'trending' | 'news' | 'sports' | 'entertainment'
  photos?: StaticImageData[]
  title: string
  likeCount: number
  comments: number
  share: number
  iframe?: string
  isVideo?: boolean
  isPlyer?: boolean
}
