import React from 'react'

import TicketImage from '@/assets/img/ticket.webp'
import TicketCard from '@/components/card/TicketCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from "swiper"

import 'swiper/css';
import { useGetTicketOrAssetQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api';
import { ClipLoader } from 'react-spinners';
import TicketsResponsive from './components/TicketsResponsive';

type Props = {}


const TICKETS = [
    {
        id: 1,
        name: 'Bronze Ticket',
        description: `Be a part of history and join the legendary band HU for their first-ever virtual concert in the Metaverse!`,
        price: 35,
        imageUrl: TicketImage.src,
    },
    {
        id: 2,
        name: 'Jade Ticket',
        description: `Be a part of history and join the legendary band HU for their first-ever virtual concert in the Metaverse!`,
        price: 20,
        imageUrl: TicketImage.src,
    },
]

SwiperCore.use([Mousewheel])

function TicketSection({ }: Props) {

    const { data: tickets, isLoading: isTicketsLoading } = useGetTicketOrAssetQuery({
        type: 'ticket'
    })

    return (
        <>
            <div className='flex justify-center w-full'>
                <div className="container">
                    <div className="md:p-16 p-4 flex flex-col md:flex-row w-full items-center rounded-xl md:bg-[rgba(62,59,222,0.08)]">
                        <div className="flex flex-col">
                            <p className="font-bold text-[32px] leading-[44px] md:text-[40px] md:w-[350px]">Buy tickets for The Hu in the Metaverse Concert</p>
                            <p className='whitespace-pre-line mt-6 md:w-[450px] text-[20px] leading-[25px] text-[#1A1A1A]'>Purchase either the Jade ticket for cinematic digital experience  or the Bronze ticket for the full virtual experience here.
                                <br />
                                <br />
                                For Bundle purchase and Single item collection please scroll down.</p>
                            <p className="mt-6 text-black text-opacity-[0.65]">
                                Powered by <a href="#" rel="noreferrer" className='text-black text-opacity-[0.93] underline'>Ard</a> & <a href="#" rel="noreferrer" className='text-black text-opacity-[0.93] underline'>Metaforce</a>
                            </p>
                        </div>
                        {isTicketsLoading ? (<div className='flex items-center justify-center w-full h-full'><ClipLoader /></div>) : (<></>)}
                        {!isTicketsLoading && tickets?.result?.records?.length ? <TicketsResponsive tickets={tickets?.result?.records} /> : <></>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TicketSection