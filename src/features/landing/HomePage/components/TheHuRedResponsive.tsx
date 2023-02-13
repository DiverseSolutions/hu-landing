import React, { useMemo } from 'react'
import { useWindowSize } from 'react-use';
import HomeTheHuRedSvg from '@/assets/svg/home-the-hu-red.svg'

type Props = {}

function TheHuRedResponsive({ }: Props) {
    const { width: sw } = useWindowSize()


    const height = useMemo(() => {
        if (!sw || sw > 1384) {
            return 193
        }
        return Math.max(193 * sw / 1384 * 0.8, 20)
    }, [sw])

    if (!sw) {
        return <></>
    }

    return (
        <div className="flex items-center justify-center w-full mt-8" style={{
            height,
        }}>
            <HomeTheHuRedSvg style={{
                transform: `scale(${sw > 1384 ? 1 : sw / 1384 * 0.8})`
            }} />
        </div>
    )
}

export default TheHuRedResponsive