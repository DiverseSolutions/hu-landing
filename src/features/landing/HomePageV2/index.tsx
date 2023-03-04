import React from 'react'
import BundlesSection from './components/BundlesSection'

import BgImg from './img/bg.png'
import ItemsSection from './components/ItemsSection'
import SystemRequirementsTransparent from './components/SystemRequirementsTransparent'
import BehindNavbar from '@/components/layout/BehindNavbar'

type Props = {}

function HomePageV2({ }: Props) {
    return (
        <>
            <BehindNavbar>
                <div className="w-full mt-[72px] md:mt-0 relative h-screen bg-[#982626] overflow-hidden">
                    <div className="absolute top-0 bottom-0 right-0 hidden md:block">
                        <img src={BgImg.src} className="object-cover w-[44vw] h-auto mix-blend-darken" />
                    </div>
                    <div className="absolute inset-0">
                        <div className="relative w-full h-full">
                            <div className="flex justify-center w-full h-full">
                                <div className="container h-full">
                                    <div className="flex flex-col justify-between w-full h-full pb-16">
                                        <div className="flex items-center justify-start md:w-[50%] h-full">
                                            <div className="flex flex-col w-full">
                                                <p className="text-xl text-center md:text-left md:text-[40px] md:leading-[44px] font-bold text-white">
                                                    Be heard in every nation and every<br /> tongue wherever the sun rises
                                                </p>
                                                <div className="flex justify-center w-full mt-8 md:justify-start">
                                                    <a href="#bundle-section" className="font-bold flex items-center text-xl text-center py-[14px] px-6 hover:bg-white hover:bg-opacity-1 text-black rounded-xl bg-white bg-opacity-[0.93]">
                                                        Buy Ticket
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full px-2 md:px-0'>
                                            <div className="w-full flex bg-white bg-opacity-[0.2] rounded-xl p-8">
                                                <div className="flex flex-col justify-between w-full md:flex-row">
                                                    <div className="flex flex-col">
                                                        <p className="text-xl font-bold text-white">The Hu in the Metaverse</p>
                                                        <p className="mt-4 text-base text-white max-w-[400px]">
                                                            Be a part of history and join the legendary band HU for their first-ever virtual concert in the Metaverse!
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col mt-4 md:mt-0">
                                                        <SystemRequirementsTransparent />
                                                        <div className="mt-4">
                                                            <div className="bg-white cursor-pointer px-6 py-[14px] rounded-xl font-bold text-center">
                                                                Download
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="bundle-section" className="pb-12">
                    <div className="flex justify-center w-full">
                        <div className="mt-[64px] min-h-[50vh]">
                            <BundlesSection />
                        </div>
                    </div>
                    <div className="mt-[100px]">
                        <ItemsSection />
                    </div>
                </div>
            </BehindNavbar>
        </>
    )
}

export default HomePageV2