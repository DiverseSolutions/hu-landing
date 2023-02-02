import { ArdArtMyOwnedNftRecord } from '@/store/rtk-query/hux-ard-art/types'
import React from 'react'

type Props = {
    nft: ArdArtMyOwnedNftRecord
}

export default function MyNftCard({ nft }: Props) {
    return (
        <div className="relative shadow-xl card w-96 bg-base-100">
            <figure><img src={nft.imageUrl} alt="Shoes" /></figure>
            <div className="relative card-body">
                <h2 className="card-title">{nft.name}</h2>
                <p>{nft.description}</p>
            </div>
            <div className="absolute inset-0">
                <div className="flex justify-end">
                    <p className="px-3 mt-2 mr-2 text-lg font-bold text-white bg-green-500 rounded-full">{nft.ownerAmount}</p>
                </div>
            </div>
        </div>
    )
}