import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {}

function BackgroundVideo({ }: Props) {
    const [isVideoLoading, setIsVideoLoading] = useState(true)
    return (
        <div className="absolute inset-0">
            <video onLoadedData={() => setIsVideoLoading(false)} src="/hu-bg.mp4" autoPlay muted loop className='object-cover w-full h-full md:w-screen md:h-screen' />
            <div className="absolute inset-0" style={{
                background: `linear-gradient(90deg, #000000 19.27%, rgba(0, 0, 0, 0) 100%)`
            }}></div>
            {isVideoLoading ? (
                <div className="absolute left-[50%] top-[50%] transform translate-y-[-50%] translate-x-[-50%]">
                    <ClipLoader color="white" />
                </div>
            ) : (<></>)}
        </div>
    )
}

export default BackgroundVideo