import Navbar from '@/components/Navbar'
import React, { ReactNode } from 'react'

function Layout({children}:{children: ReactNode}) {
  return (
    <section className='py-4 px-8'>
         <Navbar />
        {children}
    </section>
  )
}

export default Layout