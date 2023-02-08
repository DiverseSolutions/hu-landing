import PaymentMethodCard from '@/components/card/PaymentMethodCard'
import { ArdArtGetInvoiceByIdResult } from '@/store/rtk-query/hux-ard-art/types'
import { ArdArtAssetDetailByIDResult } from '@/store/rtk-query/hux-ard-art/types'
import React from 'react'

type Props = {
    product: ArdArtAssetDetailByIDResult,
    priceToUsdRate: number,
}

function InvoiceFeature({ product, priceToUsdRate }: Props) {
    return (
        <div className="flex w-full h-full">
            <PaymentMethodCard priceToUsdrate={priceToUsdRate} item={product} />
        </div>
    )
}

export default InvoiceFeature