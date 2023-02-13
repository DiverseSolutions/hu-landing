import React from 'react'
import { IoLogoMedium, IoLogoInstagram, IoLogoFacebook, IoLogoDiscord } from 'react-icons/io5'
import { RiCopyrightLine } from 'react-icons/ri'
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
        <div className='h-full overflow-y-auto md:px-0 pb-[100px]'>
            <div className="flex flex-col justify-between w-full h-full">
                <div className="flex justify-center w-full h-full">
                    <div className="container h-full">
                        <div className="flex items-center w-full h-full">
                            <div className="flex items-center w-full h-[512px]">
                                <Swiper
                                    speed={500}
                                    autoplay={false}
                                    effect="creative"
                                    centeredSlides
                                    direction={"horizontal"}
                                    threshold={1}
                                    slidesPerView={1.5}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    <SwiperSlide>
                                        <div className="flex items-center w-full h-full">
                                            <img src={HomeImgSection1.src} className="object-contain w-auto h-full" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="flex items-center w-full h-full">
                                            <img src={HomeImgSection2.src} className="object-contain w-auto h-full" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="flex items-center w-full h-full">
                                            <img src={HomeImgSection3.src} className="object-contain w-auto h-full" />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImagesSection