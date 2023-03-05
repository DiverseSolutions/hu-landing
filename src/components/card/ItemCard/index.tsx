import { formatPrice } from '@/lib/utils';
import { useUsdToArdxRateQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api';
import { ArdArtTicketOrAssetRecord } from '@/store/rtk-query/hux-ard-art/types';
import { useRouter } from 'next/router';
import React from 'react'
import { ClipLoader } from 'react-spinners';

type Props = {
    item: ArdArtTicketOrAssetRecord;
}

function ItemCard({ item }: Props) {

    const { data: usdToArdx } = useUsdToArdxRateQuery()
    const router = useRouter()

    return (
        <>
            <div onClick={() => {
                router.push(`/product?id=${item.id}`)
            }} className='relative w-full p-0 cursor-pointer card'>
                <div className="p-0 card-body">
                    <div className="w-full relative h-[200px] md:h-[350px] rounded-xl overflow-hidden">
                        <img src={item.imageUrl} className="object-cover transform transition-all duration-200 hover:scale-[1.1] w-full h-full" />
                        <div className="absolute top-4 left-4">
                        </div>
                    </div>
                    <div className="mt-2">
                        <p className="md:text-sm text-xs font-light text-black text-opacity-[0.65]">Powered by ARD & Metaforce</p>
                        <p className="md:text-base text-base font-light text-black text-opacity-[0.93]">
                            {item.name}
                        </p>
                        <div className="flex items-center mt-2">
                            <span className="md:text-xl text-sm font-bold text-black text-opacity-[0.93]">
                                ${formatPrice(item.price)}
                            </span>
                            {usdToArdx ? (
                                <span className="rounded-[4px] px-2 py-1 text-opacity-[0.65] font-light text-xs ml-[6px] bg-black bg-opacity-[0.04]">
                                    {formatPrice(item.price * usdToArdx)} ARDX
                                </span>
                            ) : (<ClipLoader size={12} />)}
                        </div>
                    </div>
                </div>
                <div className="absolute top-2 left-2 md:top-4 md:left-4">
                    <div className="flex capitalize items-center px-2 py-1 text-xs rounded-xl bg-[#ff00a8] text-white font-bold">
                        {item.tag}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemCard