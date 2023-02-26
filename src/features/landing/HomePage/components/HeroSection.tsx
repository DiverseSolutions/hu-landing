import React from 'react'
import { useWindowSize } from 'react-use'
import HomeSection2DragonImg from '@/assets/img/home-section2-dragon.png'
import classNames from 'classnames'

type HeroSectionProps = {
    animIndex: number
}

const animClasses = ['translate-y-[-80%] translate-x-[100%] scale-[1.4]', ' translate-x-0 translate-y-0 scale(1.0)', 'translate-y-[140%]']

function HeroSection(props: HeroSectionProps) {

    const { width: sw } = useWindowSize()

    return (
        <div className='h-full'>
            <div className="flex justify-center w-full h-full md:items-center">
                <div className="container">
                    <div className="flex flex-col w-full h-full md:items-center md:flex-row md:justify-center">
                        <div className="hidden md:flex">
                            <img src={HomeSection2DragonImg.src} className={classNames(`object-contain transform md:h-[68vh] w-auto`, 'transition-all duration-500 ease-in-out ', animClasses[props.animIndex] || animClasses[animClasses.length - 1] || '')} />
                        </div>
                        <div className="flex flex-col px-8 mt-8 md:mt-0 md:ml-64 md:px-0">
                            <p className='font-bold leading-[28px] text-[24px] md:leading-[44px] md:text-[40px] text-[#982626] uppercase '>Citizens of the World</p>
                            <div className="mt-8">
                                <div className="max-w-[500px]">
                                    <p className="text-white text-opacity-[0.65] text-sm md:text-base">
                                        In 2019, an NPR story put a spotlight on “a band from Mongolia that blends the screaming guitars of heavy metal and traditional Mongolian guttural singing,” accurately highlighting the cultural importance and unique musical identity of The HU. Founded in 2016 in Ulaanbaatar, Mongolia, The HU—comprised of producer Dashka along with members Gala, Jaya, Temka, and Enkush—are a modern rock group rooted in the tradition of their homeland. The band’s name translates to the Mongolian root word for “human being,” and their unique approach blends instruments like the Morin Khuur (horsehead fiddle), Tovshuur (Mongolian guitar), Tumur Khuur (jaw harp) and throat singing with contemporary sounds, creating a unique sonic profile that they call “Hunnu Rock.”
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