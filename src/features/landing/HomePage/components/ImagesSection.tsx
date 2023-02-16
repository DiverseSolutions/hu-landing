import React, { useState } from 'react'
import CopyRightSvg from '@/assets/svg/copyright.svg'
import { RiCopyrightLine } from 'react-icons/ri'
import HomeImgSection1 from '@/assets/img/home-img-section-1.jpg'
import HomeImgSection2 from '@/assets/img/home-img-section-2.jpg'
import HomeImgSection3 from '@/assets/img/home-img-section-3.jpg'
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperCore, { Pagination, Mousewheel } from "swiper";
import HomeFooterBgImg from '@/assets/img/home-footer-img-bg.png'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useWindowSize } from 'react-use';
import classNames from 'classnames'
import { MdClose } from 'react-icons/md'

SwiperCore.use([Pagination])

type Props = {}

const images = [
    HomeImgSection2.src,
]

function ImagesSection({ }: Props) {

    const [isSingleImage, setIsSingleImage] = useState(images.length === 1)

    const { width: sw } = useWindowSize()
    const isMobile = sw <= 768

    const [selectedImg, setSelectedImg] = useState<string>()

    if (isSingleImage) {
        return (
            <div className='h-full md:px-0 pb-[100px]'>
                <div className="flex flex-col justify-between w-full h-full">
                    <div className="flex justify-center w-full h-full">
                        <div className="container relative flex items-center w-full h-full">
                            <div className="relative inset-0 z-10 grid w-full grid-cols-1 px-4 mt-8 md:hidden">
                                <div className="absolute inset-0 md:hidden">
                                    <div className="flex items-center justify-center w-full h-full">
                                        <img src={HomeFooterBgImg.src} className="h-[33vh] opacity-[0.4] w-full object-contain transform translate-y-[-50%]" />
                                    </div>
                                </div>
                                {images.map((imgUrl) => (
                                    <div key={imgUrl} className='z-30 w-full h-full aspect-square'>
                                        <img onClick={() => setSelectedImg(imgUrl)} src={imgUrl} className="object-contain w-full h-full" />
                                    </div>
                                ))}
                            </div>
                            <div className="items-center hidden w-full h-full md:flex">
                                <div className="flex justify-center items-center w-full h-[512px] relative">
                                    <div className="absolute inset-0">
                                        <div className="flex items-center justify-center w-full h-full">
                                            <img src={HomeFooterBgImg.src} className="h-full opacity-[0.4] w-auto object-contain transform translate-y-[-200px]" />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 z-10">
                                        <div className="flex items-center justify-center w-full h-full">
                                            <img src={images[0]} className="object-contain w-auto h-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className='h-full md:px-0 pb-[100px]'>
                <div className="flex flex-col justify-between w-full h-full">
                    <div className="flex justify-center w-full h-full">
                        <div className="container h-full">
                            <div className="grid w-full grid-cols-2 px-4 mt-8 md:hidden">
                                {images.map((imgUrl) => (
                                    <div key={imgUrl} className='w-full h-full aspect-square'>
                                        <img onClick={() => setSelectedImg(imgUrl)} src={imgUrl} className="object-cover w-full h-full" />
                                    </div>
                                ))}
                            </div>
                            <div className="items-center hidden w-full h-full md:flex">
                                <div className="flex items-center w-full h-[512px] relative">
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
            {selectedImg ? (
                <div className={classNames('w-screen z-[9999] inset-0 h-screen fixed bg-black bg-opacity-[0.75]', { 'pointer-events-none': !selectedImg })}>
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0">
                            <div className="flex items-center justify-center w-full h-full" onClick={() => setSelectedImg(undefined)}>
                                <img src={selectedImg} className="object-contain w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<></>)}
        </>
    )
}

export default ImagesSection