import React, { ReactNode } from 'react'
import Menu from "@/components/menu"
import { Sidebar } from './dashboard/components/sidebar'

function Layout({ children }: { children: ReactNode }) {
  return (
    <section>
      <Menu />
      <div className="border-t">
        <div className="bg-background">
          <div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar />
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Layout