import React from 'react'
import CopyRightSvg from '@/assets/svg/copyright.svg'
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

const images = [
    HomeImgSection1.src,
    HomeImgSection2.src,
    HomeImgSection3.src,
]

function ImagesSection({ }: Props) {

    const { width: sw } = useWindowSize()
    const isMobile = sw <= 768

    return (
        <div className='h-full overflow-y-auto md:px-0 pb-[100px]'>
            <div className="flex flex-col justify-between w-full h-full">
                <div className="flex justify-center w-full h-full">
                    <div className="container h-full">
                        <div className="grid grid-cols-2">

                        </div>
                        <div className="items-center hidden w-full h-full md:flex">
                            <div className="flex items-center w-full h-[512px]">
                                <Swiper
                                    speed={500}
                                    autoplay={false}
                                    freeMode
                                    slidesPerView={2}
                                    spaceBetween={0}
                                    direction={"horizontal"}
                                    threshold={1}
                                    modules={[Pagination]}
                                    className="home-images-swiper"
                                >
                                    <SwiperSlide>
                                        <div className="flex items-center justify-center w-full h-full">
                                            <img src={HomeImgSection1.src} className="object-contain w-full h-auto" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="flex items-center justify-center w-full h-full">
                                            <img src={HomeImgSection2.src} className="object-contain w-full h-auto" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="flex items-center justify-center w-full h-full">
                                            <img src={HomeImgSection3.src} className="object-contain w-full h-auto" />
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