import React from 'react'

type Props = {
    children: React.ReactNode
}

function BehindNavbar({ children }: Props) {
    return (
        <div className={`-mt-[80px] md:-mt-[104px]`}>
            {children}
        </div>
    )
}

export default BehindNavbar