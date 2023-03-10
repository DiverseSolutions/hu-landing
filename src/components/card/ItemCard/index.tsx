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
                if (item.price) {
                    router.push(`/product?id=${item.id}`)
                }
            }} className='relative w-full p-0 cursor-pointer card group'>
                <div className="p-0 card-body">
                    <div className="w-full relative h-[200px] md:h-[350px] rounded-xl overflow-hidden">
                        <img src={item.imageUrl} className="object-cover object-top transform transition-all duration-200 hover:scale-[1.1] w-full h-full" />
                        <div className="absolute top-4 left-4">
                        </div>
                    </div>
                    <div className="mt-2">
                        <p className="md:text-xs text-sm font-light text-black text-opacity-[0.65]">Powered by Ard & Metaforce</p>
                        <p className="md:text-base text-sm text-black text-opacity-[0.93]">
                            {item.name}
                        </p>
                        {item.price ? (
                            <div className="flex items-center mt-2">
                                <span className="md:text-base text-sm font-bold text-black text-opacity-[0.93]">
                                    ${formatPrice(item.price)}
                                </span>
                                {usdToArdx ? (
                                    <span className="rounded-[4px] md:text-sm px-2 py-1 text-opacity-[0.65] font-light text-xs ml-[6px] bg-black bg-opacity-[0.04]">
                                        {formatPrice(item.price * usdToArdx)} ARDX
                                    </span>
                                ) : (<ClipLoader size={12} />)}
                            </div>) : (<></>)}
                    </div>
                </div>
                {item.subTag?.length ? (
                    <div className="absolute top-2 left-2 md:top-4 md:left-4">
                        <div className="flex flex-col items-start">
                            <div className="flex capitalize items-center px-2 py-1 text-xs rounded-xl bg-[#ff00a8] text-white font-bold">
                                {item.subTag}
                            </div>
                            <div className='flex mt-2'>
                                <div className="hidden mt-2 group-hover:flex">
                                    <div className="px-2 capitalize py-1 rounded-xl bg-black bg-opacity-[0.04] font-bold text-xs">{item.category}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (<></>)}
            </div>
        </>
    )
}

export default ItemCard