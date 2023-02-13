import React, { } from 'react'
import classNames from 'classnames'

type Props = {
    isVisible: boolean;
}

function ScrollToExplore({ isVisible }: Props) {

    return (
        <div className={classNames('hidden cursor-pointer md:flex transform transition-all duration-300', { 'opacity-1': isVisible, 'opacity-0': !isVisible })}>
            <span className='text-white uppercase font-bold text-[40px]'>Scroll <br /> to explore</span>
        </div>
    )
}

export default ScrollToExplore