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
                router.push(`/bundle?id=${bundle.id}`)
            }} className='card w-[450px] cursor-pointer'>
                <div className="card-body">
                    <div className="w-full h-[300px]">
                        <img src={bundle.imageUrl} className="object-cover w-auto h-full rounded-xl" />
                    </div>
                    <div className="mt-8">
                        <p className="text-sm text-black text-opacity-[0.65]">Powered by ARD & Metaforce</p>
                        <p className="text-xl font-bold text-black text-opacity-[0.93]">
                            {bundle.name}
                        </p>
                        <div className="flex items-center">
                            <p className="text-xl font-bold text-black text-opacity-[0.93]">
                                ${formatPrice(bundle.price)}
                            </p>
                            <div className="rounded-[4px] bg-black bg-opacity-[0.04]">
                                ARDX{formatPrice(bundle.price)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BundleCard