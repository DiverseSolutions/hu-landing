import { formatPrice } from '@/lib/utils';
import { ArdArtBundleRecord } from '@/store/rtk-query/hux-ard-art/types';
import { useRouter } from 'next/router';
import React from 'react'

type Props = {
    bundle: ArdArtBundleRecord
}

function BundleCard({ bundle }: Props) {

    const router = useRouter()

    return (
        <>
            <div onClick={() => {
                router.push(`/detail?bundle=${bundle.id}`)
            }} className='card relative p-0 w-[450px] cursor-pointer'>
                <div className="p-0 card-body">
                    <div className="w-full h-[360px] rounded-xl overflow-hidden">
                        <img src={bundle.imageUrl} className="object-cover transform hover:scale-[1.1] transition-all duration-200 w-full h-full" />
                    </div>
                    <div className="mt-2">
                        <p className="text-sm text-black text-opacity-[0.65] font-light">Powered by ARD & Metaforce</p>
                        <p className="text-xl font-bold text-black text-opacity-[0.93]">
                            {bundle.name}
                        </p>
                        <div className="flex items-center justify-start mt-2">
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

export default BundleCard