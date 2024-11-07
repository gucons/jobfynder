'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'
import { FaChevronDown, FaPlus } from 'react-icons/fa6'

import { findAllParent, findMenuItem, getAppMenuItems, getMenuItemFromURL } from '@/helpers/menu'
import type { MenuItemType } from '@/types/menu'

type SubMenus = {
  item: MenuItemType
  itemClassName?: string
  linkClassName?: string
  activeMenuItems?: Array<string>
  level: number
}

const MenuItemWithChildren = ({ item, activeMenuItems, itemClassName, linkClassName, level }: SubMenus) => {
  const level1 = level === 1
  return (
    <Dropdown as="li" className={itemClassName} drop={level >= 2 ? 'end' : undefined}>
      <DropdownToggle
        as={Link}
        href=""
        role="button"
        className={clsx('content-none', linkClassName)}
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-haspopup="true"
        aria-expanded="false">
        {item.label}
        {level1 ? <FaChevronDown size={8} className="ms-1" /> : <FaPlus size={10} />}
      </DropdownToggle>
      <DropdownMenu as="ul" aria-labelledby="listingMenu" className="custom-navbar-dropdown-menu" data-bs-popper="static" renderOnMount>
        {(item.children ?? []).map((child, idx) => (
          <Fragment key={idx + child.key + idx}>
            {child.children ? (
              <MenuItemWithChildren
                item={child}
                level={level + 1}
                activeMenuItems={activeMenuItems}
                itemClassName="dropdown-submenu"
                linkClassName={clsx('dropdown-item dropdown-toggle arrow-none d-flex align-items-center justify-content-between', {
                  active: activeMenuItems?.includes(child.key),
                })}
              />
            ) : (
              <MenuItem item={child} level={level + 1} linkClassName={clsx(activeMenuItems?.includes(child.key) && 'active')} />
            )}
          </Fragment>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

const MenuItem = ({ item, linkClassName, level, itemClassName }: SubMenus) => {
  return item.isDivider ? (
    <DropdownDivider />
  ) : (
    <li className={itemClassName}>
      <MenuItemLink item={item} linkClassName={linkClassName} level={level + 1} />
    </li>
  )
}

const MenuItemLink = ({ item, linkClassName }: SubMenus) => {
  const Icon = item.icon
  return (
    <DropdownItem as={Link} href={item.url ?? ''} target={item.target} className={linkClassName}>
      {Icon && <Icon className="text-success me-2" />}
      {item.label}
    </DropdownItem>
  )
}

const AppMenu = () => {
  const [activeMenuItems, setActiveMenuItems] = useState<string[]>([])

  const menuItems = getAppMenuItems()

  const pathname = usePathname()

  const activeMenu = useCallback(() => {
    const trimmedURL = pathname?.replaceAll('', '')
    const matchingMenuItem = getMenuItemFromURL(menuItems, trimmedURL)

    if (matchingMenuItem) {
      const activeMt = findMenuItem(menuItems, matchingMenuItem.key)
      if (activeMt) {
        setActiveMenuItems([activeMt.key, ...findAllParent(menuItems, activeMt)])
      }
    }
  }, [pathname, menuItems])

  useEffect(() => {
    activeMenu()
  }, [activeMenu, menuItems])

  return (
    <ul className={clsx('navbar-nav navbar-nav-scroll ms-auto')}>
      {(menuItems ?? []).map((item, idx) => {
        return (
          <Fragment key={item.key + idx}>
            {item.children ? (
              <MenuItemWithChildren
                item={item}
                activeMenuItems={activeMenuItems}
                level={1}
                itemClassName="nav-item"
                linkClassName={clsx('nav-link content-none d-flex align-items-center gap-1 justify-content-between', {
                  active: activeMenuItems.includes(item.key),
                })}
              />
            ) : (
              <MenuItem
                item={item}
                level={1}
                itemClassName="nav-item"
                linkClassName={clsx('nav-link', activeMenuItems.includes(item.key) && 'active')}
              />
            )}
          </Fragment>
        )
      })}
    </ul>
  )
}

export default AppMenu
