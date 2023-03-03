import { ArdArtAssetDetailResult } from '@/store/rtk-query/hux-ard-art/types'
import React from 'react'

type Props = {
    item: ArdArtAssetDetailResult
}

function ItemDetailFeature({
    item
}: Props) {

    return (
        <>
            <p>item</p>
            {item.name}
        </>
    )
}

export default ItemDetailFeature