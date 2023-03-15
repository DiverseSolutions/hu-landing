import { CATEGORY_COLORS } from '@/lib/consts';
import { formatPrice } from '@/lib/utils';
import { useUsdToArdxRateQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react'
import { ClipLoader } from 'react-spinners';

type Props = {
    ticket: {
        id: number;
        name: string;
        description: string;
        shortDesc?: string;
        price: number;
        imageUrl: string;
        cardImageUrl?: string;
        category?: string;
        level?: number;
    }
}

function TicketCard({ ticket }: Props) {

    const router = useRouter()
    const { data: usdToArdx } = useUsdToArdxRateQuery()

    return (
        <div onClick={() => {
            if (ticket.level !== undefined) {
                router.push(`/bundle?id=${ticket.id}`)
            } else {
                router.push(`/product?id=${ticket.id}`)
            }
        }} className='relative w-full cursor-pointer card md:max-w-[352px] bg-black bg-opacity-[0.65] p-4 rounded-xl'>
            <div className="p-0 card-body">
                <div className="relative w-full h-auto overflow-hidden aspect-square rounded-xl">
                    <img src={ticket.cardImageUrl || ticket.imageUrl} className="object-top object-cover transform hover:scale-[1.1] transition-all duration-200 w-full h-full" />
                    <div className="absolute top-4 left-4">
                        <div style={{
                            backgroundColor: ticket.category ? (CATEGORY_COLORS[ticket.category] || '#2663FF') : '#2663FF'
                        }} className={classNames("flex items-center px-2 py-1 text-xs font-bold text-white capitalize rounded-xl")}>
                            {ticket.category}
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <p className="text-base md:text-xl text-white text-opacity-[0.93]">
                        {ticket.name}
                    </p>
                    <p className="mt-2 text-sm text-white text-opacity-[0.65] h-[60px] overflow-y-auto no-scrollbar">{ticket.shortDesc || ticket.description}</p>
                    <div className="flex items-center justify-start mt-2">
                        <span className="text-sm md:text-base font-bold text-white text-opacity-[0.93]">
                            ${formatPrice(ticket.price)}
                        </span>
                        {usdToArdx ? (
                            <span className="rounded-[4px] text-white px-2 py-1 text-opacity-[0.65] font-light text-xs ml-[6px] bg-black bg-opacity-[0.1]">
                                {formatPrice(ticket.price * usdToArdx)} ARDX
                            </span>
                        ) : (<ClipLoader size={12} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketCard