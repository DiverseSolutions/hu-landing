import React, { useEffect, useState } from "react";
import { useVideoJS } from "react-hook-videojs";
import "video.js/dist/video-js.css";
import { ArdArtHelperLiveResult } from "@/store/rtk-query/hux-ard-art/types";
import "@videojs/themes/dist/fantasy/index.css";
import Cookies from "js-cookie";

type Props = {
    live: ArdArtHelperLiveResult
}

const DirectorCutVideoDemo = ({ live, ...props }: Props) => {

    const [isLoaded, setIsLoaded] = useState(() => {
        if (live.cookie?.length) {
            live.cookie.forEach((c) => {
                Cookies.remove(c.Name, {
                    domain: '.hu.rocks',
                })
                Cookies.set(c.Name, c.Value, {
                    domain: '.hu.rocks',
                })
            })
            return true;
        }
        return false;
    })

    const videoUrl = live.url
    const className = "w-full h-auto vjs-theme-fantasy video-js vjs-big-play-centered aspect-video";
    const { Video, player, ready } = useVideoJS(
        {
            sources: [{ src: videoUrl, type: 'application/x-mpegURL', }],
            controls: true,
            autoplay: 'muted',
            html5: {
                hls: {
                    withCredentials: true,
                }
            },
        },
        className
    );

    useEffect(() => {
        if (ready && player) {
            live.cookie.forEach((c) => {
                Cookies.set(c.Name, c.Value, {
                    domain: '.hu.rocks',
                })
            });
            (async () => {
                try {
                    player.play()
                    player.requestFullscreen()
                } catch (e) {
                    console.error('fullscreen request err')
                    console.error(e)
                }
            })()
        }
    }, [player])

    return (
        <>
            <Video />
        </>
    );
};

export default DirectorCutVideoDemo;