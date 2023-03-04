import React from 'react'

type Props = {
    children: React.ReactNode
}

function BehindNavbar({ children }: Props) {
    return (
        <div className={`-mt-[72px] md:-mt-[104px]`}>
            {children}
        </div>
    )
}

export default BehindNavbar