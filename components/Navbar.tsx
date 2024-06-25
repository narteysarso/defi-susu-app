import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './ModeToggle'

function Navbar() {
  return (
    <nav className='flex justify-between mx-auto mb-8  items-center border-b border-gray-200 py-4 px-8'>
        <Link href="#"> 
        Logo
        </Link>

        <ModeToggle />

    </nav>
  )
}

export default Navbar