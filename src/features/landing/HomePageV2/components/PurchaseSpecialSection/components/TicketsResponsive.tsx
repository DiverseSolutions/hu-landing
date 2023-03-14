import TicketCard from '@/components/card/TicketCard'
import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from "swiper"

import 'swiper/css';

SwiperCore.use([Mousewheel])

type Props = {
    tickets: {
        id: number;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        type: string;
    }[]
}

function TicketsResponsive({
    tickets
}: Props) {
    return (
        <>
            <div className="justify-center flex-grow hidden mt-8 ml-16 space-x-16 md:flex md:mt-0">
                {tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}
            </div>
            <div className='w-full mt-8 md:hidden'>
                <Swiper
                    modules={[
                        Mousewheel,
                    ]} speed={500}
                    preventInteractionOnTransition
                    mousewheel={{
                        forceToAxis: true
                    }}
                    autoHeight
                    direction="horizontal"
                    slidesPerView={1.2}
                    spaceBetween={8}
                >
                    {tickets.map((ticket) => (
                        <SwiperSlide key={ticket.id}>
                            <div>
                                <TicketCard
                                    ticket={ticket}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default TicketsResponsive