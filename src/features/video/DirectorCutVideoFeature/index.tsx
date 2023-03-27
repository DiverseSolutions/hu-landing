import DirectorCutVideo from '@/components/video/DirectorCutVideo'
import React, { useState } from 'react'

type Props = {}

function DirectorCutVideoFeature({ }: Props) {

    const [isVisible, setIsVisible] = useState(false)

    return (
        <>
            <button className='btn btn-black' onClick={() => {
                setIsVisible(!isVisible)
            }}>{isVisible ? 'Hide Preview Video' : 'Show Preview Video'}</button>
            {isVisible ? (
                <div className='mt-2'>
                    <DirectorCutVideo />
                </div>
            ) : <></>}
        </>
    )
}

export default DirectorCutVideoFeature