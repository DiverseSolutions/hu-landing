import React from 'react'
import BundlesSection from './components/BundlesSection'
import HomeNavbarV2 from './components/HomeNavbarV2'

import BgImg from './img/bg.png'

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
                        <div className="flex justify-center w-full h-full">
                            <div className="container h-full">
                                <div className="flex items-center justify-start w-[50%] h-full">
                                    <div className="flex flex-col w-full">
                                        <p className="text-[40px] font-bold text-white uppercase">
                                            Be heard in every nation and every tongue wherever the sun rises
                                        </p>
                                        <div className="flex mt-8">
                                            <button className="font-bold text-xl hover:bg-white hover:bg-opacity-1 text-black btn rounded-xl bg-white bg-opacity-[0.93]">
                                                Buy Ticket
                                            </button>
                                            <button className="ml-4 text-xl font-bold btn rounded-xl hover:bg-white hover:bg-opacity-[0.04] text-white bg-white bg-opacity-[0.04]">
                                                About us
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="flex justify-center w-full">
                    <div className="container mt-[64px] min-h-[50vh] pb-12">
                        <BundlesSection />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePageV2