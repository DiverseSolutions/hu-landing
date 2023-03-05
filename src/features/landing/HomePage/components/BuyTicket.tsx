import Link from 'next/link'
import React from 'react'

type Props = {}

function BuyTicket({ }: Props) {
    return (
        <Link href={`/ticket?id=${process.env.NEXT_PUBLIC_TICKET_ID}`} className="flex w-full justify-center items-center p-1 bg-white cursor-pointer py-[14px] md:px-[18px]">
            <span className='px-8 text-sm font-bold uppercase md:text-base'>
                Ticket Purchase
            </span>
        </Link>
    )
}

export default BuyTicket