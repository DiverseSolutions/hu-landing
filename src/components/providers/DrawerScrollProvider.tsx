import useDrawerScroll from '@/hooks/useDrawerScroll'
import React, { useEffect, useState } from 'react'

type Props = {
    children(x: number, y: number): JSX.Element
}

function DrawerScrollProvider({
    children
}: Props) {

    const { xOffset, yOffset } = useDrawerScroll()

    return (
        children(xOffset, yOffset)
    )
}

export default DrawerScrollProvider