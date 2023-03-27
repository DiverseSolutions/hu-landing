import { useHelperLiveQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import React, { useState, useEffect, useRef } from 'react'
import { ClipLoader } from 'react-spinners'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'

type Props = {}

function DirectorCutVideo({ }: Props) {

    const player = useRef<ReactPlayer>(null)
    const { isFetching: isHelperLiveFetching, data: liveData, error: liveError } = useHelperLiveQuery()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!isHelperLiveFetching && liveData?.result) {
            console.log(liveData?.result)
            liveData?.result?.cookie.forEach((c) => {
                Cookies.set(c.Name, c.Value, {
                    domain: c.Domain,
                    secure: c.Secure,
                })
            })
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
                            hlsOptions: {
                                xhrSetup: function (xhr: any, url: any) {
                                    xhr.withCredentials = true // send cookies
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