import React, { ReactNode } from 'react'

function BoldHeading({ children }: { children: ReactNode }) {
    return (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {children}
        </h1>
    )
}

export default BoldHeading