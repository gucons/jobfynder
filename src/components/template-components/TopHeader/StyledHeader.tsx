'use client'
import { usePathname } from 'next/navigation'
import { useMemo, type HTMLProps } from 'react'

import type { ChildrenType } from '@/types/component'

const StyledHeader = ({ children, ...restProps }: ChildrenType & HTMLProps<HTMLHeadingElement>) => {
  const transparentPages = ['/event', '/events/details']

  const pathname = usePathname()

  const classes = useMemo(() => {
    if (transparentPages.includes(pathname)) {
      return {
        header: 'navbar-transparent header-static',
        nav: 'navbar navbar-dark navbar-expand-lg',
      }
    }
    return {
      header: 'navbar-light fixed-top header-static bg-mode',
      nav: 'navbar navbar-expand-lg',
    }
  }, [pathname])

  return (
    <header className={classes.header} {...restProps}>
      <nav className={classes.nav}>{children}</nav>
    </header>
  )
}

export default StyledHeader
