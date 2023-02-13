import React, { useEffect, useMemo, useState } from 'react'
import HomeNavbar from './components/HomeNavbar'
import MobileDrawer from '@/components/drawer/MobileDrawer'

import useWindowResize from 'beautiful-react-hooks/useWindowResize'
import dynamic from 'next/dynamic'
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperCore, { Pagination, Mousewheel } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import BuyTicket from './components/BuyTicket'
import BandMembersSection from './components/BandMembersSection'
import classNames from 'classnames'

const TheHuRedResponsive = dynamic(() => import('./components/TheHuRedResponsive'), { ssr: false, })
const ScrollToExplore = dynamic(() => import('./components/ScrollToExplore'), { ssr: false, })
const HeroSection = dynamic(() => import('./components/HeroSection'), { ssr: false, })
const ImagesSection = dynamic(() => import('./components/ImagesSection'), { ssr: false, })
const HeroParagraph = dynamic(() => import('./components/HeroParagraph'), { ssr: false, })

type Props = {}

SwiperCore.use([Pagination, Mousewheel])

function HomePage({ }: Props) {

    const [prevSwiperActiveIdx, setPrevSwiperActiveIdx] = useState(0)
    const [swiperActiveIdx, setSwiperActiveIdx] = useState(0)

    return (
        <>
            <MobileDrawer>
                <div className="relative w-screen h-screen overflow-hidden bg-black">
                    <div className='fixed top-0 left-0 right-0 z-50'>
                        <HomeNavbar />
                    </div>
                    <div className='h-screen'>
                        <Swiper
                            speed={500}
                            direction={"vertical"}
                            onActiveIndexChange={(s) => {
                                setPrevSwiperActiveIdx(swiperActiveIdx)
                                setSwiperActiveIdx(s.activeIndex)
                            }}
                            slidesPerView={1}
                            mousewheel
                            modules={[Mousewheel, Pagination]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <div className='pt-[100px] h-full'>
                                    <div className="flex justify-center w-full h-full">
                                        <div className="container">
                                            <div className="flex flex-col w-full">
                                                <div className="flex justify-center w-full">
                                                    <div className="relative">
                                                        <TheHuRedResponsive />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center w-full px-8 mt-8">
                                                    <div className="w-full text-center md:text-right max-w-[1384px]">
                                                        <p className='break-words text-[28px] leading-[32px] font-bold text-white'>BE HEARD IN EVERY NATION AND EVERY TONGUE<br />WHEREVER THE SUN RISES</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='pt-[100px] h-full'>
                                    <HeroSection showAnim={swiperActiveIdx === 1} revertAnim={swiperActiveIdx === 0 && prevSwiperActiveIdx === 1} />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='pt-[100px] h-full'>
                                    <HeroParagraph />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='pt-[100px] h-full'>
                                    <ImagesSection />
                                </div>
                            </SwiperSlide>
                            {/* <SwiperSlide>
                                <section className='md:pt-[100px] h-full' style={{ height: 'calc(100vh-100px)' }}>
                                    <BandMembersSection />
                                </section>
                            </SwiperSlide> */}
                        </Swiper>
                    </div>
                </div>
                <div className="fixed h-[300px] z-50 pointer-events-none bottom-0 left-0 right-0" style={{
                    background: `radial-gradient(105.33% 76.33% at 50% 95.88%, #721C1C 0.01%, rgba(0, 0, 0, 0) 100%)`
                }}></div>
                <div className="fixed bottom-0 left-0 right-0 z-50 md:block">
                    <div className="flex justify-center w-full">
                        <div className="container">
                            <div className="flex items-center justify-center w-full pb-16 md:justify-between">
                                <div className="self-start hidden md:flex">
                                    <ScrollToExplore isVisible={swiperActiveIdx === 0} />
                                </div>
                                <div className={classNames("flex self-center md:self-end", { 'hidden': swiperActiveIdx !== 0 })}>
                                    <BuyTicket />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MobileDrawer>
        </>
    )
}

export default HomePage