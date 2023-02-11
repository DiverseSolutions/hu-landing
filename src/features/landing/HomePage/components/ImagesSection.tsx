import React from 'react'
import HomeImgSection1 from '@/assets/img/home-img-section-1.jpg'
import HomeImgSection2 from '@/assets/img/home-img-section-2.jpg'
import HomeImgSection3 from '@/assets/img/home-img-section-3.jpg'
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperCore, { Pagination, Mousewheel } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useWindowSize } from 'react-use';

SwiperCore.use([Pagination, Mousewheel])

type Props = {}

function ImagesSection({ }: Props) {

    const { width: sw } = useWindowSize()
    const isMobile = sw <= 768

    return (
        <div className='h-full px-8 md:px-0'>
            <div className="flex justify-center w-full">
                <div className="container">
                    <div className="w-full">
                        <div className="h-[512px] w-full">
                            <Swiper
                                speed={500}
                                spaceBetween={16}
                                autoplay={false}
                                effect="creative"
                                direction={"horizontal"}
                                onActiveIndexChange={(s) => {

                                }}
                                slidesPerView={isMobile ? 1.5 : 2.5}
                                mousewheel
                                modules={[Mousewheel, Pagination]}
                                className="mySwiper"
                            >
                                <SwiperSlide>
                                    <div className="flex items-center justify-center w-full h-full">
                                        <div className="max-w-[520px]">
                                            <p className='font-bold text-white text-[40px] leading-[44px]'>WORLD TREMBLING NOMAD ROCK</p>
                                            <p className='text-white text-opacity-[0.65] text-[32px]'>Lorem ipsum dolor sit amet consectetur. Aliquam id eget at quis porttitor sit porttitor purus. Augue arcu sapien vestibulum est purus purus egestas.</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="flex items-center w-full h-full">
                                        <img src={HomeImgSection1.src} className="object-contain w-full h-auto" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="flex items-center w-full h-full">
                                        <img src={HomeImgSection2.src} className="object-contain w-full h-auto" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="flex items-center w-full h-full">
                                        <img src={HomeImgSection3.src} className="object-contain w-full h-auto" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="flex items-center justify-center w-full h-full">
                                        <div className="max-w-[520px]">
                                            <p className='font-bold text-white text-[40px] leading-[44px]'>WORLD TREMBLING NOMAD ROCK</p>
                                            <p className='text-white text-opacity-[0.65] text-[32px]'>Lorem ipsum dolor sit amet consectetur. Aliquam id eget at quis porttitor sit porttitor purus. Augue arcu sapien vestibulum est purus purus egestas.</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImagesSection