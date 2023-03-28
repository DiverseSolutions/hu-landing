import { useHelperLiveQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import React, { useState, useEffect, useRef } from 'react'
import { isSafari } from 'react-device-detect'
import { ClipLoader } from 'react-spinners'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'

type Props = {}

function DirectorCutVideo({ }: Props) {

    const player = useRef<ReactPlayer>(null)
    const { isFetching: isHelperLiveFetching, data: liveData, error: liveError } = useHelperLiveQuery()
    const [isLoading, setIsLoading] = useState(true)

    const [cfPolicy, setCfPolicy] = useState('')
    const [cfSig, setCfSig] = useState('')
    const [cfKeyPair, setCfKeyPair] = useState('')

    useEffect(() => {
        if (!isHelperLiveFetching && liveData?.result) {
            if (liveData.result.cookie?.length) {
                const cookies = liveData.result.cookie;
                setCfPolicy(cookies.find((c) => c.Name === 'CloudFront-Policy', '')?.Value || '')
                setCfSig(cookies.find((c) => c.Name === 'CloudFront-Signature', '')?.Value || '')
                setCfKeyPair(cookies.find((c) => c.Name === 'CloudFront-Key-Pair-Id', '')?.Value || '')
                const url = new URL(liveData.result.url)
                liveData.result.cookie.forEach((c) => {
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
    }, [isHelperLiveFetching, liveData, liveError])

    const handleClickFullscreen = () => {
        if (screenfull.isEnabled && player.current) {
            try {
                screenfull.request((player.current as any).wrapper)
            } catch (e) {
                console.error(e)
            }
        }
    };

    if (liveError) {
        return <p>{`${liveError}`}</p>
    }

    if (isLoading) {
        return <ClipLoader />
    }

    if (liveData?.result) {
        return (
            <>
                <ReactPlayer
                    ref={player}
                    controls
                    playing
                    muted
                    url={liveData.result.url} config={{
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
                <button onClick={handleClickFullscreen} className='mt-1 btn'>Fullscreen</button>
            </>
        )
    }

    return (
        <p>An unknow error occured.</p>
    )
}

export default DirectorCutVideo