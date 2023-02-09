import { ArdArtMyOwnedNftRecord } from '@/store/rtk-query/hux-ard-art/types'
import moment from 'moment'
import React, { useMemo } from 'react'

type Props = {
    nft: ArdArtMyOwnedNftRecord,
    priceToUsdRate: number,
}

export default function MyNftCard({ nft, priceToUsdRate }: Props) {

    const priceUsd = useMemo(() => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(nft.price * priceToUsdRate)
    }, [nft.price, priceToUsdRate])

    const priceFormatted = useMemo(() => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(nft.price).substring(1)
    }, [nft.price, priceToUsdRate])

    return (
        <div className="relative shadow-none rounded-xl card border-[1px] border-black border-opacity-[0.2] p-6 w-full">
            <figure><img src={nft.imageUrl} className="object-cover rounded-xl w-full h-[300px]" alt="Shoes" /></figure>
            <div className="relative w-full h-auto px-2 pb-0 card-body">
                <div className='px-2'>
                    <p className="text-xs text-terteriary">Hosted by the hu</p>
                    <h2 className="text-lg font-normal card-title">{nft.name}</h2>
                </div>
                <div className="mt-1 -px-2">
                    <div className="p-2 bg-black bg-opacity-[0.04] rounded-lg">
                        <div className="grid w-full grid-cols-2">
                            <div className="flex flex-col w-full">
                                <p className="text-xs text-terteriary">Price</p>
                                <p className="mt-1 text-sm">{priceUsd}</p>
                                <p className="mt-1 text-xs font-normal text-terteriary">ARDX {priceFormatted} </p>
                            </div>
                            <div className="flex flex-col w-full">
                                <p className="text-xs text-terteriary">Date</p>
                                <p className="mt-1 text-sm">{moment(nft.createdAt).format('YYYY-MM-DD')}</p>
                                <p className="mt-1 text-xs font-normal text-terteriary">{moment(nft.createdAt).format('HH:mm:ss')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}