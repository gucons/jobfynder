'use client'
import Link from 'next/link'
import Image from 'next/image'

// import { useLayoutContext } from '@/context/useLayoutContext'



const LogoBox = () => {
  // const { theme } = useLayoutContext()
  return (
    <Link className="navbar-brand" href="/">
      {/* {theme === 'dark' ? ( */}
        <Image src={"/icon.svg"} alt="logo" height={36} width={36} className="navbar-brand-item" />
      {/* ) : ( */}
        {/* <Image src={logo} alt="logo" height={36} width={36} className="navbar-brand-item" /> */}
      {/* )} */}
    </Link>
  )
}

export default LogoBox
