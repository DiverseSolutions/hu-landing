import React from 'react'
import BundlesSection from './components/BundlesSection'
import HomeNavbarV2 from './components/HomeNavbarV2'

import BgImg from './img/bg.png'
import SystemRequirements from './components/SystemRequirements'
import ItemsSection from './components/ItemsSection'

type Props = {}

function HomePageV2({ }: Props) {
    return (
        <>
            <div className="relative w-full h-screen">
                <div className="w-full relative h-screen bg-[#982626] overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 z-10">
                        <HomeNavbarV2 />
                    </div>
                    <div className="absolute top-0 bottom-0 right-0">
                        <img src={BgImg.src} className="object-cover w-[44vw] h-auto mix-blend-darken" />
                    </div>
                    <div className="absolute inset-0">
                        <div className="relative w-full h-full">
                            <div className="flex justify-center w-full h-full">
                                <div className="container h-full">
                                    <div className="flex flex-col justify-between w-full h-full pb-16">
                                        <div className="flex items-center justify-start w-[50%] h-full">
                                            <div className="flex flex-col w-full">
                                                <p className="text-[40px] font-bold text-white">
                                                    Be heard in every nation and every<br /> tongue wherever the sun rises
                                                </p>
                                                <div className="flex mt-8">
                                                    <button className="font-bold flex items-center text-xl text-center py-[14px] px-6 hover:bg-white hover:bg-opacity-1 text-black rounded-xl bg-white bg-opacity-[0.93]">
                                                        Buy Ticket
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <div className="w-full flex bg-white bg-opacity-[0.2] rounded-xl p-8">
                                                <div className="flex justify-between w-full">
                                                    <div className="flex flex-col">
                                                        <p className="text-xl font-bold text-white">The Hu in the Metaverse</p>
                                                        <p className="mt-4 text-base text-white max-w-[400px]">
                                                            Be a part of history and join the legendary band HU for their first-ever virtual concert in the Metaverse!
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <SystemRequirements />
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
            </div>
            <div className="pb-12">
                <div className="flex justify-center w-full">
                    <div className="mt-[64px] min-h-[50vh]">
                        <BundlesSection />
                    </div>
                </div>
                <div className="mt-[100px]">
                    <ItemsSection />
                </div>
            </div>
        </>
    )
}

export default HomePageV2