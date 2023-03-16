import React, { useState } from 'react'
import BundlesSection from './components/BundlesSection'

import ItemsSection from './components/ItemsSection'
import SystemRequirementsTransparent from './components/SystemRequirementsTransparent'
import DesktopBehindNavbar from '@/components/layout/DesktopBehindNavbar'
import BackgroundVideo from './components/BackgroundVideo'
import PurchaseSpecialSection from './components/PurchaseSpecialSection'
import CouponModal from '@/components/modals/CouponModal'

type Props = {}

function HomePageV2({ }: Props) {

    return (
        <>
            <div>
                <DesktopBehindNavbar>
                    <div className="w-full block md:block md:mt-0 relative md:h-screen bg-[#982626] md:overflow-hidden">
                        <BackgroundVideo />
                        <div className="inset-0 md:absolute">
                            <div className="relative w-full h-full">
                                <div className="flex justify-center w-full h-full">
                                    <div className="container h-full px-4 md:px-0">
                                        <div className="flex flex-col justify-between w-full h-full pb-16">
                                            <div className="flex mt-16 md:mt-0 items-center justify-start md:w-[65%] h-full">
                                                <div className="flex flex-col w-full">
                                                    <p className="text-[32px] leading-[36px] text-left md:text-left md:text-[40px] md:leading-[44px] font-bold text-white">
                                                        Experience Hunnu Rock and<br />Mongolian culture like never before
                                                    </p>
                                                    <div className="mt-8">
                                                        <p className='text-[24px] font-bold text-[#B3B3B3]'>Join The HU for their first-ever interactive virtual concert on March 30, 2023.</p>
                                                    </div>
                                                    <div className="flex w-full mt-8">
                                                        <button onClick={() => {
                                                            const targetEl = document.querySelector('#ticket-section')
                                                            if (targetEl) {
                                                                const drawerEl = document.querySelector('.drawer-content')
                                                                const targetY = targetEl.getBoundingClientRect().y - 200
                                                                drawerEl?.scrollTo({ top: targetY, behavior: 'smooth' })
                                                            }
                                                        }} className="font-bold cursor-pointer text-base flex justify-center items-center md:text-xl text-center py-2.5 md:py-[14px] px-4 md:px-6 hover:bg-white hover:bg-opacity-1 text-black rounded-xl bg-white bg-opacity-[0.93]">
                                                            Buy Ticket
                                                        </button>
                                                        <a href="https://www.thehuofficial.com" target="_blank" rel="noreferrer" className="font-bold text-base flex justify-center text-white items-center md:text-xl text-center ml-4 py-2.5 md:py-[14px] px-4 md:px-6 hover:bg-black hover:bg-opacity-1 bg-white rounded-xl bg-opacity-[0.04]">
                                                            About The HU
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='w-full mt-16'>
                                                <div className="w-full flex bg-white bg-opacity-[0.2] rounded-xl p-4 md:p-8">
                                                    <div className="flex flex-col justify-between w-full md:flex-row">
                                                        <div className="flex flex-col">
                                                            <p className="text-base font-bold text-white md:text-xl">How to watch the concert?</p>
                                                            <p className="mt-4 text-xs md:text-base text-white text-opacity-[0.65]">
                                                                Please download and install this file on a computer that meets the system requirement and runs on Windows OS. By meeting the system requirements you will be able to enjoy the concert in high quality. The HU in the Metaverse concert package will be available for worldwide download on March 28th, 2023.
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col mt-4 md:mt-0 md:min-w-[300px] md:ml-6">
                                                            <SystemRequirementsTransparent />
                                                            <div className="mt-4">
                                                                <div className="bg-white text-black text-opacity-[0.65] bg-opacity-[0.04] text-sm md:text-base px-6 py-2.5 md:py-[14px] rounded-xl font-bold text-center">
                                                                    <span>Download</span>
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
                    <div id="ticket-section" className='mt-12 md:mt-16'>
                        <PurchaseSpecialSection />
                    </div>
                    <div id="bundle-section" className='mt-12 md:mt-16'>
                        <div className="flex justify-center w-full px-4">
                            <div className="min-h-[50vh]">
                                <BundlesSection />
                            </div>
                        </div>
                        <div className="mt-[100px]">
                            <ItemsSection />
                        </div>
                    </div>
                </DesktopBehindNavbar>
            </div>
            <CouponModal />
        </>
    )
}

export default HomePageV2