import React from 'react'
import { useWindowSize } from 'react-use'
import HomeSection2DragonImg from '@/assets/img/home-section2-dragon.png'
import classNames from 'classnames'

type Props = {}

function HeroParagraph({ }: Props) {

    const { width: sw } = useWindowSize()

    return (
        <div className='w-full h-full pb-[100px]'>
            <div className="flex justify-center w-full h-full md:items-center">
                <div className="container">
                    <div className="flex flex-col items-center w-full h-full md:flex-row md:justify-center">
                        <div className="hidden md:flex">
                            <img src={HomeSection2DragonImg.src} className={classNames(`object-contain opacity-0 transform h-[68vh] w-auto`)} />
                        </div>
                        <div className="flex flex-col px-8 mt-8 md:mt-0 md:ml-64 md:px-0">
                            <p className='font-bold leading-[28px] text-[24px] md:leading-[44px] md:text-[40px] text-[#982626] uppercase md:max-w-[540px]'>One and Only The HU</p>
                            <div className="mt-8">
                                <div className="max-w-[500px]">
                                    <p className="text-white text-opacity-[0.65] text-sm md:text-base">
                                        THE HU released their second album Rumble Of Thunder in 2022 via Better Noise Music while continuing to tour across the globe, adding in dates in Japan and festival appearances at Coachella, Lollapalooza, Download Festival and more. The band were recently featured on the soundtrack for Better Noise Films’ thriller The Retaliators and also appeared on screen. In November of 2022, The HU became the first-ever rock/metal band to receive the prestigious UNESCO “Artist of Peace” Designation at UNESCO’s headquarters in Paris, FR by UNESCO Director-General Audrey Azoulay. Previous recipients include Celine Dion, Shirley Bassey, Sarah Brightman, Herbie Hancock, Marcus Miller and World Orchestra For Peace.
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

export default HeroParagraph