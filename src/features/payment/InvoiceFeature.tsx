import PaymentMethodCard from '@/components/card/PaymentMethodCard'
import { ArdArtGetInvoiceByIdResult } from '@/store/rtk-query/hux-ard-art/types'
import { ArdArtAssetDetailByIDResult } from '@/store/rtk-query/hux-ard-art/types'
import React from 'react'

type Props = {
    product: ArdArtAssetDetailByIDResult,
    region: string,
    priceToUsdRate: number,
}

function InvoiceFeature({ product, region, priceToUsdRate }: Props) {
    return (
        <div className="flex w-full h-full">
            <PaymentMethodCard region={region} priceToUsdrate={priceToUsdRate} item={product} />
        </div>
    )
}

export default InvoiceFeature