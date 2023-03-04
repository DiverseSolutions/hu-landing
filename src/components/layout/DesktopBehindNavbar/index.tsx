import React from 'react'

type Props = {
    children: React.ReactNode
}

function DesktopBehindNavbar({ children }: Props) {
    return (
        <div className={`md:-mt-[104px]`}>
            {children}
        </div>
    )
}

export default DesktopBehindNavbar