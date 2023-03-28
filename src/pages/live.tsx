import DirectorCutVideoFeature from '@/features/video/DirectorCutVideoFeature'
import React from 'react'

type Props = {}

function LivePage({ }: Props) {
    return (
        <>
            <div className='w-full h-screen'>
                <DirectorCutVideoFeature />
            </div>
        </>
    )
}

export default LivePage