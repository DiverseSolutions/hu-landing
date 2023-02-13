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

SwiperCore.use([Pagination])

type Props = {}

function ImagesSection({ }: Props) {

    const { width: sw } = useWindowSize()
    const isMobile = sw <= 768

    return (
        <div className='h-full px-8 md:px-0'>
            <div className="flex justify-center w-full h-full">
                <div className="container h-full">
                    <div className="w-full">
                        <div className="flex items-center w-full h-full">
                            <Swiper
                                speed={500}
                                spaceBetween={16}
                                autoplay={false}
                                effect="creative"
                                direction={"horizontal"}
                                onActiveIndexChange={(s) => {

                                }}
                                slidesPerView={isMobile ? 1.5 : 2.5}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                                <SwiperSlide>
                                    <div className="flex items-center justify-center w-full h-full">
                                        <div className="max-w-[520px]">
                                            <p className='text-[18px] md:text-4xl font-bold text-white'>How Mongolian band carved a new path in rock n roll</p>
                                            <p className='text-white mt-8 text-opacity-[0.65] text-[18px'>Their debut album, 2019 ‘s The Gereg, debuted at #1 on the World Album and Top New Artist Charts while receiving critical acclaim from the likes of Billboard, NPR, GQ, The Guardian, The Independent, Revolver, and even Sir Elton John himself. Their appeal was instantly recognized globally with sold-out tours across the world in North America, Europe, Asia, and Australia and acknowledged by their home country who awarded them Mongolia’s highest state award, The Order of Genghis Khan, which was granted to the band by the President of Mongolia, Kh. Battulga in 2020. </p>
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