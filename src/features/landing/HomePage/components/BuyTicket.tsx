import Link from 'next/link'
import React from 'react'
import HomeBuyTicketIconImg from '@/assets/img/home-buy-ticket-icon.png'

type Props = {}

function BuyTicket({ }: Props) {
    return (
        <Link href="/early" className="flex items-center p-1 bg-white cursor-pointer">
            <span className="w-[72px] h-[72px] p-2 bg-black flex justify-center items-center">
                <img src={HomeBuyTicketIconImg.src} className="object-contain w-auto h-full" />
            </span>
            <span className='px-8 font-bold uppercase'>
                Buy Ticket (Early bird)
            </span>
        </Link>
    )
}

export default BuyTicket