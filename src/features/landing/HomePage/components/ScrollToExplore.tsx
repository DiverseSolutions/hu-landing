import React, { } from 'react'
import classNames from 'classnames'
import ScrollToExploreSvg from '@/assets/svg/scroll-to-explore-arrow.svg'
import SwiperCore from "swiper";

type Props = {
    isVisible: boolean;
    swiper?: SwiperCore
}

function ScrollToExplore({ isVisible, swiper }: Props) {

    return (
        <div onClick={() => {
            swiper?.slideTo(1)
        }} className={classNames('hidden cursor-pointer items-center md:flex transform transition-all duration-300', { 'opacity-1': isVisible, 'opacity-0': !isVisible })}>
            <span className='text-white uppercase font-bold text-[24px] leading-[32px]'>Scroll <br /> to explore</span>
            <span className="ml-8 animate-bounce"><ScrollToExploreSvg /></span>
        </div>
    )
}

export default ScrollToExplore