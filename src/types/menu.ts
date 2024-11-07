import type { HTMLAttributeAnchorTarget } from 'react'
import type { IconType } from 'react-icons'
import type { BootstrapVariantType } from './component'

export type MenuItemType = {
  key: string
  label?: string
  isTitle?: boolean
  isDivider?: boolean
  url?: string
  badge?: {
    text: string
    variant: BootstrapVariantType
  }
  disabled?: boolean
  target?: HTMLAttributeAnchorTarget
  children?: MenuItemType[]
  parentKey?: string
  icon?: IconType
}
