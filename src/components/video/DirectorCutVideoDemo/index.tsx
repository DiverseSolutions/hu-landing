import React from "react";
import { useVideoJS } from "react-hook-videojs";
import "video.js/dist/video-js.css";
import '@videojs/themes/dist/city/index.css';
import Head from "next/head";

const DirectorCutVideoDemo = () => {
    const videoUrl = "http://techslides.com/demos/sample-videos/small.mp4";
    const className = "w-full h-auto vjs-theme-city video-js vjs-big-play-centered aspect-video";
    const { Video, player, ready } = useVideoJS(
        {
            sources: [{ src: videoUrl }],
            controls: true,
            html5: {
                hls: {
                    withCredentials: true,
                }
            }
        },
        className
    );
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