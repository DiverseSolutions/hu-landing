import React from 'react'
import { useWindowSize } from 'react-use'
import HomeSection2DragonImg from '@/assets/img/home-section2-dragon.png'
import classNames from 'classnames'

type Props = {}

function HeroParagraph({ }: Props) {

    const { width: sw } = useWindowSize()

    return (
        <div className='w-full h-full pb-[100px]'>
            <div className="flex items-center justify-center w-full h-full">
                <div className="container">
                    <div className="flex flex-col items-center w-full h-full md:flex-row md:justify-center">
                        <div className="flex">
                            <img src={HomeSection2DragonImg.src} className={classNames(`object-contain transform h-[68vh] w-auto`)} />
                        </div>
                        <div className="flex flex-col px-8 mt-8 md:mt-0 md:ml-64 md:px-0">
                            <p className='font-bold leading-[28px] text-[24px] md:leading-[44px] md:text-[40px] text-[#982626] uppercase max-w-[33vw]'>How Mongolian band carved a new path in rock n roll</p>
                            <div className="mt-8">
                                <div className="max-w-[500px]">
                                    <p className="text-white text-opacity-[0.65] text-sm md:text-base">
                                        Their debut album, 2019 ‘s The Gereg, debuted at #1 on the World Album and Top New Artist Charts while receiving critical acclaim from the likes of Billboard, NPR, GQ, The Guardian, The Independent, Revolver, and even Sir Elton John himself. Their appeal was instantly recognized globally with sold-out tours across the world in North America, Europe, Asia, and Australia and acknowledged by their home country who awarded them Mongolia’s highest state award, The Order of Genghis Khan, which was granted to the band by the President of Mongolia, Kh. Battulga in 2020.

                                        A deluxe version of The Gereg included collaborations with Jacoby Shaddix of Papa Roach and Lzzy Hale of Halestorm, and caught the attention of Metallica, who heard their Mongolian rendition of “Sad But True,” and then enlisted them to take part on their Metallica Blacklist album, released in 2021 with The HU’s cover of “Through The Never” alongside other high-profile guest artists like Miley Cyrus, Chris Stapleton, Phoebe Bridgers, J Balvin, St. Vincent and many more. The band was also made “canon” in the Star Wars fandom after they wrote and recorded an original song for EA Games’ Star Wars Jedi: Fallen Order which was featured in its gameplay.
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