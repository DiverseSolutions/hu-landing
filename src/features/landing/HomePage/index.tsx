import React, { useState } from 'react'
import HomeNavbar from './components/HomeNavbar'
import MobileDrawer from '@/components/drawer/MobileDrawer'
import HomeBgImg from '@/assets/img/home-bg.png'
import dynamic from 'next/dynamic'
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Pagination, Mousewheel } from "swiper"

import TheHuRedResponsive from './components/TheHuRedResponsive'

import MobileHeroImg from '@/assets/img/hero-mobile.png'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import BuyTicket from './components/BuyTicket'
import classNames from 'classnames'
import HomeFooter from '@/components/footer/HomeFooter'

const ScrollToExplore = dynamic(() => import('./components/ScrollToExplore'), { ssr: false, })
const HeroSection = dynamic(() => import('./components/HeroSection'), { ssr: false, })
const ImagesSection = dynamic(() => import('./components/ImagesSection'), { ssr: false, })
const HeroParagraph = dynamic(() => import('./components/HeroParagraph'), { ssr: false, })

type Props = {}

SwiperCore.use([Pagination, Mousewheel])

function HomePage({ }: Props) {

    const [prevSwiperActiveIdx, setPrevSwiperActiveIdx] = useState(0)
    const [swiperActiveIdx, setSwiperActiveIdx] = useState(0)

    const [swiper, setSwiper] = useState<SwiperCore>()

    return (
        <>
            <MobileDrawer>
                <div className="relative w-screen h-screen overflow-hidden bg-black">
                    <div className='fixed top-0 left-0 right-0 z-50'>
                        <HomeNavbar />
                    </div>
                    {/* TODO:: background snow effect */}
                    <div className="absolute inset-0 hidden pointer-events-none">
                        <img src={HomeBgImg.src} className="object-cover w-full h-full mix-blend-lighten" />
                    </div>
                    <div className='h-screen'>
                        <Swiper
                            onSwiper={(sw) => setSwiper(sw)}
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
                                <div className='pt-[64px] md:pt-[100px] h-full'>
                                    <div className="flex justify-center w-full h-full">
                                        <div className="container">
                                            <div className="flex flex-col w-full">
                                                <div className="flex justify-center w-full">
                                                    <div className="relative w-full">
                                                        <TheHuRedResponsive />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center w-full px-8 mt-4">
                                                    <div className="w-full text-center md:text-right">
                                                        <p className='text-xl font-bold text-white break-words md:text-2xl md:block'>IN THE METAVERSE</p>
                                                        <p className='break-words mt-4 text-[28px] leading-[32px] font-bold text-white hidden md:block'>BE HEARD IN EVERY NATION AND EVERY TONGUE<br />WHEREVER THE SUN RISES</p>
                                                        <p className='text-center mt-4 text-[20px] leading-[28px] font-bold text-white md:hidden'>BE HEARD IN EVERY NATION AND<br />EVERY TONGUE WHEREVER THE<br />SUN RISES</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='pt-[64px] md:pt-[100px] h-full'>
                                    <HeroSection animIndex={swiperActiveIdx} />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='pt-[64px] md:pt-[100px] h-full'>
                                    <HeroParagraph />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='pt-[64px] md:pt-[100px] h-full'>
                                    <ImagesSection />
                                </div>
                            </SwiperSlide>
                            {/* <SwiperSlide>
                                <section className='md:pt-[64px] md:pt-[100px] h-full' style={{ height: 'calc(100vh-100px)' }}>
                                    <BandMembersSection />
                                </section>
                            </SwiperSlide> */}
                        </Swiper>
                    </div>
                </div>
                <div className={classNames("fixed h-[50vh] md:h-[300px] md:bg-home-footer-radial-red z-[48] pointer-events-none bottom-0 left-0 right-0", {
                    'bg-home-footer-radial-red': swiperActiveIdx === 0
                })}></div>
                <div className="fixed bottom-0 left-0 right-0 z-50 md:block">
                    <div className="flex justify-center w-full">
                        <div className="container">
                            <div className="flex items-center justify-center w-full pb-16 md:justify-between">
                                <div className="self-start hidden md:flex">
                                    <ScrollToExplore swiper={swiper} isVisible={swiperActiveIdx === 0} />
                                </div>
                                <div className={classNames("flex w-full mx-8 md:mx-0 md:w-auto self-center md:self-end md:block", { 'hidden': swiperActiveIdx !== 0 })}>
                                    <BuyTicket />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classNames("bottom-0 duration transition-all duration-300 md:hidden fixed pointer-events-none left-0 right-0 z-[47]", { 'opacity-0': swiperActiveIdx !== 0, 'opacity-1': swiperActiveIdx === 0 })}>
                    <div className="flex justify-center w-full">
                        <img src={MobileHeroImg.src} className="w-auto h-[50vh]" />
                    </div>
                </div>
                <div className={classNames("fixed bottom-0 left-0 right-0 z-[52] pointer-events-none transition-all duration-300", { 'opacity-0': swiperActiveIdx !== 3, 'opacity-100': swiperActiveIdx === 3 })}>
                    <HomeFooter />
                </div>
            </MobileDrawer>
        </>
    )
}

export default HomePage