import DirectorCutVideo from '@/components/video/DirectorCutVideo'
import React, { useState } from 'react'

type Props = {}

function DirectorCutVideoFeature({ }: Props) {

    const [isVisible, setIsVisible] = useState(false)

    return (
        <>
            <div className='flex flex-col items-center w-full mt-8'>
                <DirectorCutVideo />
            </div>
        </>
    )
}

export default DirectorCutVideoFeature