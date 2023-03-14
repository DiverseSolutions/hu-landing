import React, { useMemo } from 'react'

import TicketImage from '@/assets/img/ticket.webp'
import TicketCard from '@/components/card/TicketCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from "swiper"

import 'swiper/css';
import { useGetBundleQuery, useGetTicketOrAssetQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api';
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

function PurchaseSpecialSection({ }: Props) {

    const { data: tickets, isLoading: isTicketsLoading } = useGetTicketOrAssetQuery({
        type: 'ticket'
    })

    const { data: bundles, isLoading: isBundlesLoading } = useGetBundleQuery({
        level: 1,
    })

    const data = useMemo(() => {
        if (isTicketsLoading || isTicketsLoading) {
            return []
        }
        if (tickets?.result?.records && bundles?.result?.records?.length) {
            return [...tickets.result.records, ...bundles.result.records]
        }
        return []
    }, [bundles, tickets, isBundlesLoading, isTicketsLoading])

    return (
        <>
            <div className='flex justify-center w-full'>
                <div className="container">
                    <div className="md:p-16 p-4 flex flex-col md:flex-row w-full items-center rounded-xl md:bg-[rgba(62,59,222,0.08)]">
                        <div className="flex flex-col">
                            <p className="font-bold text-[32px] leading-[44px] md:text-[40px] md:w-[350px]">Buy tickets for<br />The Hu in the<br />Metaverse<br />Concert</p>
                            <p className='whitespace-pre-line mt-6 md:w-[450px] text-[20px] leading-[25px] text-[#1A1A1A]'>Purchase the basic entry ticket for the full interactive experience and directors cut ticket for the cinematic experience.</p>
                            <p className="mt-6 text-black text-opacity-[0.65]">
                                Powered by <a href="#" rel="noreferrer" className='text-black text-opacity-[0.93] underline'>Ard</a> & <a href="#" rel="noreferrer" className='text-black text-opacity-[0.93] underline'>Metaforce</a>
                            </p>
                        </div>
                        {isTicketsLoading || isBundlesLoading ? (<div className='flex items-center justify-center w-full h-full'><ClipLoader /></div>) : (<></>)}
                        {(!isTicketsLoading && !isBundlesLoading) && tickets?.result?.records?.length ? <TicketsResponsive tickets={data} /> : <></>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PurchaseSpecialSection