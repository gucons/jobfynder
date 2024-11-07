
import { APP_MENU_ITEMS } from '@/lib/menu-items'
import type { MenuItemType } from '@/types/menu'

export const getAppMenuItems = () => {
  // NOTE - You can fetch from server and return here as well
  return APP_MENU_ITEMS
}

export const findAllParent = (menuItems: MenuItemType[], menuItem: MenuItemType): string[] => {
  let parents: string[] = []
  const parent = findMenuItem(menuItems, menuItem.parentKey)

  if (parent) {
    parents.push(parent.key)
    if (parent.parentKey) {
      parents = [...parents, ...findAllParent(menuItems, parent)]
    }
  }
  return parents
}

export const getMenuItemFromURL = (items: MenuItemType | MenuItemType[], url: string): MenuItemType | undefined => {
  if (Array.isArray(items)) {
    for (const item of items) {
      const foundItem = getMenuItemFromURL(item, url)
      if (foundItem) return foundItem
    }
  } else {
    if (items.url === url) return items
    if (items.children != null) {
      for (const item of items.children) {
        if (item.children != null) {
          const foundItem = getMenuItemFromURL(item.children, url)
          if (foundItem) return foundItem
        } else if (item.url === url) return item
      }
    }
  }
}

export const findMenuItem = (menuItems: MenuItemType[] | undefined, menuItemKey: MenuItemType['key'] | undefined): MenuItemType | null => {
  if (menuItems && menuItemKey) {
    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].key === menuItemKey) {
        return menuItems[i]
      }
      const found = findMenuItem(menuItems[i].children, menuItemKey)
      if (found) return found
    }
  }
  return null
}
