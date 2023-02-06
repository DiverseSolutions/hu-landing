import React, { useRef } from 'react'

type Props = {
    children: React.ReactNode,
    drawerContent?: React.ReactNode
}

function MobileDrawer({ children, drawerContent }: Props) {

    const drawerRef = useRef<HTMLInputElement>(null)

    return (
        <div className="drawer drawer-end">
            <input ref={drawerRef} id="hu-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="hu-drawer" className="drawer-overlay"></label>
                {drawerContent ? drawerContent : <></>}
            </div>
        </div>
    )
}

export default MobileDrawer