import { formatPrice } from '@/lib/utils';
import { ArdArtBundleRecord, ArdArtTicketOrAssetRecord } from '@/store/rtk-query/hux-ard-art/types';
import { useRouter } from 'next/router';
import React from 'react'

type Props = {
    item: ArdArtTicketOrAssetRecord
}

function ItemCard({ item: bundle }: Props) {

    const router = useRouter()

    return (
        <>
            <div onClick={() => {
                router.push(`/bundle?id=${bundle.id}`)
            }} className='relative w-full p-0 cursor-pointer card'>
                <div className="p-0 card-body">
                    <div className="w-full h-[350px] rounded-xl overflow-hidden">
                        <img src={bundle.imageUrl} className="object-cover transform transition-all duration-200 hover:scale-[1.1] w-full h-full" />
                    </div>
                    <div className="mt-2">
                        <p className="text-sm font-light text-black text-opacity-[0.65]">Powered by ARD & Metaforce</p>
                        <p className="text-base font-light text-black text-opacity-[0.93]">
                            {bundle.name}
                        </p>
                        <div className="flex items-center mt-2">
                            <span className="text-xl font-bold text-black text-opacity-[0.93]">
                                ${formatPrice(bundle.price)}
                            </span>
                            <span className="rounded-[4px] px-2 py-1 text-opacity-[0.65] font-light text-xs ml-[6px] bg-black bg-opacity-[0.04]">
                                {formatPrice(bundle.price)} ARDX
                            </span>
                        </div>
                    </div>
                </div>
                <div className="absolute top-4 left-4">
                    <div className="flex capitalize items-center px-2 py-1 text-xs rounded-xl bg-[#ff00a8] text-white font-bold">
                        {bundle.tag}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemCard