import React, { useState, useEffect, useRef } from 'react'
import { isSafari } from 'react-device-detect'
import { ClipLoader } from 'react-spinners'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import { ArdArtHelperLiveResult } from '@/store/rtk-query/hux-ard-art/types'

type Props = {
    live: ArdArtHelperLiveResult
}

function DirectorCutVideo({
    live
}: Props) {

    const player = useRef<ReactPlayer>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (live) {
            if (live.cookie?.length) {
                live.cookie.forEach((c) => {
                    Cookies.remove(c.Name, {
                        domain: '.hu.rocks',
                    })
                    Cookies.set(c.Name, c.Value, {
                        domain: '.hu.rocks',
                    })
                })
            }
            setIsLoading(false)
        }
    }, [live])

    if (isLoading) {
        return <ClipLoader />
    }

    return (
        <ReactPlayer
            ref={player}
            controls
            playing
            muted
            width={'100%'}
            height={'auto'}
            url={live.url} config={{
                file: {
                    attributes: {
                        preload: 'none',
                    },
                    forceHLS: !isSafari,
                    forceVideo: true,
                    hlsOptions: {
                        xhrSetup: function (xhr: any, url: any) {
                            xhr.withCredentials = true
                        }
                    }
                }
            }} />
    )
}

export default DirectorCutVideo