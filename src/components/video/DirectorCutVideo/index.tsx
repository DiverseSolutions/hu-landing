import React, { useEffect } from "react";
import { useVideoJS } from "react-hook-videojs";
import "video.js/dist/video-js.css";
import { ArdArtHelperLiveResult } from "@/store/rtk-query/hux-ard-art/types";
import "@videojs/themes/dist/fantasy/index.css";

type Props = {
    live: ArdArtHelperLiveResult
}

const DirectorCutVideoDemo = (props: Props) => {

    const videoUrl = props.live.url

    const className = "w-full h-auto vjs-theme-fantasy video-js vjs-big-play-centered aspect-video";
    const { Video, player, ready } = useVideoJS(
        {
            sources: [{ src: videoUrl, type: 'application/x-mpegURL' }],
            controls: true,
            html5: {
                hls: {
                    withCredentials: true,
                }
            }
        },
        className
    );

    useEffect(() => {
        if (ready && player) {
            (async () => {
                try {
                    await player.requestFullscreen()
                } catch (e) {
                    console.error('fullscreen request err')
                    console.error(e)
                }
            })()
        }
    }, [player])

    if (ready) {
        // Do something with the video.js player object.
    }
    return (
        <>
            <Video />
        </>
    );
};

export default DirectorCutVideoDemo;