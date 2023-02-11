import React from 'react'
import { useWindowSize } from 'react-use'
import HomeSection2DragonImg from '@/assets/img/home-section2-dragon.png'
import classNames from 'classnames'

type HeroSectionProps = {
    showAnim: boolean,
    revertAnim: boolean,
}

function HeroSection(props: HeroSectionProps) {

    const { width: sw } = useWindowSize()

    return (
        <div className='h-full'>
            <div className="flex items-center justify-center w-full h-full">
                <div className="container">
                    <div className="flex flex-col items-center w-full h-full md:flex-row md:justify-center">
                        <div className="flex">
                            <img src={HomeSection2DragonImg.src} className={classNames(`object-contain transform  max-w-[50vw] md:max-w-[326px] h-auto`,
                                [sw <= 768 ? 'animate-heroMobile' : 'animate-hero'],
                                { [sw <= 768 ? 'animate-heroMobile' : 'animate-hero']: props.showAnim, [sw <= 768 ? 'animate-heroMobileRevert' : 'animate-heroRevert']: props.revertAnim })} style={{
                                    animationPlayState: props.showAnim || props.revertAnim ? 'running' : 'paused'
                                }} />
                        </div>
                        <div className="flex flex-col px-8 mt-8 md:mt-0 md:ml-64 md:px-0">
                            <p className='font-bold leading-[28px] text-[24px] md:leading-[44px] md:text-[40px] text-white'>WORLD TREMBLING<br /> NOMAD ROCK</p>
                            <div className="mt-8">
                                <div className="max-w-[500px]">
                                    <p className="text-white break-all text-opacity-[0.65] text-base leading-[20px] md:leading-[36px] md:text-[32px]">
                                        Lorem ipsum dolor sit amet consectetur. Aliquam id eget at quis porttitor sit porttitor purus. Augue arcu sapien vestibulum est purus purus egestas. Adipiscing purus ipsum sed condimentum ultrices. Diam eget sem accumsan tristique nulla cras nullam eu cras.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection