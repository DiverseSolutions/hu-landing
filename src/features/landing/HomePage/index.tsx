import React, { useEffect, useMemo, useState } from 'react'
import HomeNavbar from './components/HomeNavbar'
import MobileDrawer from '@/components/drawer/MobileDrawer'
import HomeTheHuRedSvg from '@/assets/svg/home-the-hu-red.svg'
import useWindowResize from 'beautiful-react-hooks/useWindowResize'
import dynamic from 'next/dynamic'
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperCore, { Pagination, Mousewheel } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import BuyTicket from './components/BuyTicket'
import BandMembersSection from './components/BandMembersSection'

const ScrollToExplore = dynamic(() => import('./components/ScrollToExplore'), { ssr: false, })
const HeroSection = dynamic(() => import('./components/HeroSection'), { ssr: false, })
const ImagesSection = dynamic(() => import('./components/ImagesSection'), { ssr: false, })

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
                                <div className='pt-[100px] h-full' style={{ height: 'calc(100vh-100px)' }}>
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
                                                <div className="flex self-center mt-4 md:hidden">
                                                    <BuyTicket />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='pt-[100px] h-full' style={{ height: 'calc(100vh-100px)' }}>
                                    <HeroSection showAnim={swiperActiveIdx === 1} revertAnim={swiperActiveIdx === 0 && prevSwiperActiveIdx === 1} />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='pt-[100px] h-full' style={{ height: 'calc(100vh-100px)' }}>
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
                <div className="fixed h-[300px] bottom-0 left-0 right-0" style={{
                    background: `radial-gradient(105.33% 76.33% at 50% 95.88%, #721C1C 0.01%, rgba(0, 0, 0, 0) 100%)`
                }}></div>
                {swiperActiveIdx < 2 ? (
                    <div className="fixed bottom-0 left-0 right-0 z-10 hidden md:block">
                        <div className="flex justify-center w-full">
                            <div className="container">
                                <div className="flex items-center justify-between w-full pb-16">
                                    <div className="flex self-start">
                                        <ScrollToExplore isVisible={swiperActiveIdx === 0} />
                                    </div>
                                    <div className="flex self-end">
                                        <BuyTicket />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <></>}
            </MobileDrawer>
        </>
    )
}

export default HomePage



function TheHuRedResponsive() {
    const [sw, setSw] = useState<number>(1500);
    const onWindowSize = useWindowResize()

    useEffect(() => {
        setSw(window.innerWidth)
    }, [])

    onWindowSize(() => {
        setSw(window.innerWidth)
    })

    const height = useMemo(() => {
        if (!sw || sw > 1384) {
            return 193
        }
        return Math.max(193 * sw / 1384 * 0.8, 20)
    }, [sw])

    if (!sw) {
        return <></>
    }

    return (
        <div className="flex items-center justify-center w-full mt-8" style={{
            height,
        }}>
            <HomeTheHuRedSvg style={{
                transform: `scale(${sw > 1384 ? 1 : sw / 1384 * 0.8})`
            }} />
        </div>
    )
}