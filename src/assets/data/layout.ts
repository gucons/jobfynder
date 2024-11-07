import type { ProfilePanelLink } from '@/types/data'

import homeImg from '@/assets/images/icon/home-outline-filled.svg'
import personImg from '@/assets/images/icon/person-outline-filled.svg'
import medalImg from '@/assets/images/icon/medal-outline-filled.svg'
import clockImg from '@/assets/images/icon/clock-outline-filled.svg'
import earthImg from '@/assets/images/icon/earth-outline-filled.svg'
import calendarImg from '@/assets/images/icon/calendar-outline-filled.svg'
import chatImg from '@/assets/images/icon/chat-outline-filled.svg'
import notificationImg from '@/assets/images/icon/notification-outlined-filled.svg'
import cogImg from '@/assets/images/icon/cog-outline-filled.svg'
import likeImg from '@/assets/images/icon/like-outline-filled.svg'
import starImg from '@/assets/images/icon/star-outline-filled.svg'
import taskDoneImg from '@/assets/images/icon/task-done-outline-filled.svg'
import arrowBoxedImg from '@/assets/images/icon/arrow-boxed-outline-filled.svg'
import shieldImg from '@/assets/images/icon/shield-outline-filled.svg'
import handshakeImg from '@/assets/images/icon/handshake-outline-filled.svg'
import chatAltImg from '@/assets/images/icon/chat-alt-outline-filled.svg'
import trashImg from '@/assets/images/icon/trash-var-outline-filled.svg'

export const profilePanelLinksData1: ProfilePanelLink[] = [
  {
    image: homeImg,
    name: 'Feed',
    link: '/profile/feed',
  },
  {
    image: personImg,
    name: 'Connections',
    link: '/profile/connections',
  },
  {
    image: earthImg,
    name: 'Latest News',
    link: '/blogs',
  },
  {
    image: calendarImg,
    name: 'Events',
    link: '/profile/events',
  },
  {
    image: chatImg,
    name: 'Groups',
    link: '/feed/groups',
  },
  {
    image: notificationImg,
    name: 'Notifications',
    link: '/notifications',
  },
  {
    image: cogImg,
    name: 'Settings',
    link: '/settings/account',
  },
]

export const profilePanelLinksData2: ProfilePanelLink[] = [
  {
    image: homeImg,
    name: 'Feed',
    link: '/profile/feed',
  },
  {
    image: medalImg,
    name: 'Popular',
    link: '',
  },
  {
    image: clockImg,
    name: 'Recent',
    link: '',
  },
  {
    image: likeImg,
    name: 'Subscriptions',
    link: '',
  },
  {
    image: starImg,
    name: 'My favorites',
    link: '',
  },
  {
    image: taskDoneImg,
    name: 'Wishlist',
    link: '',
  },
  {
    image: notificationImg,
    name: 'Notifications',
    link: '/notifications',
  },
  {
    image: cogImg,
    name: 'Settings',
    link: '/settings/account',
  },
  {
    image: arrowBoxedImg,
    name: 'Logout',
    link: '/auth/sign-in',
  },
]

export const settingPanelLinksData: ProfilePanelLink[] = [
  {
    image: personImg,
    name: 'Account',
    link: '/settings/account',
  },
  {
    image: notificationImg,
    name: 'Notification',
    link: '/settings/notification',
  },
  {
    image: shieldImg,
    name: 'Privacy and safety',
    link: '/settings/privacy',
  },
  {
    image: handshakeImg,
    name: 'Communications',
    link: '/settings/communication',
  },
  {
    image: chatAltImg,
    name: 'Messaging',
    link: '/settings/messaging',
  },
  {
    image: trashImg,
    name: 'Close account',
    link: '/settings/close-account',
  },
]
