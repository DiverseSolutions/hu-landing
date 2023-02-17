import React, { useMemo } from 'react'
import HomeTheHuImg from '@/assets/img/home-the-hu-red.png'

type Props = {}

function TheHuRedResponsive({ }: Props) {

    return (
        <div className="flex items-center justify-center w-full px-8 mt-8 md:px-0">
            <img src={HomeTheHuImg.src} className="object-contain w-full h-auto" />
        </div>
    )
}

export default TheHuRedResponsive