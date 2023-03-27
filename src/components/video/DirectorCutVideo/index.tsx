import { useHelperLiveQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import React, { useState, useEffect } from 'react'
import { ClipLoader } from 'react-spinners'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'

type Props = {}

function DirectorCutVideo({ }: Props) {

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

    if (liveError) {
        return <p>{`${liveError}`}</p>
    }

    if (isLoading) {
        return <ClipLoader />
    }

    if (liveData?.result) {
        return <ReactPlayer
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
    }

    return (
        <p>An unknow error occured.</p>
    )
}

export default DirectorCutVideo