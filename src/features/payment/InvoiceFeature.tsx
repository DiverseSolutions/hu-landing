import PaymentMethodCard from '@/components/card/PaymentMethodCard'
import { ArdArtInvoiceResult } from '@/store/rtk-query/ard-art/types'
import { ArdArtAssetDetailByIDResult } from '@/store/rtk-query/hux-ard-art/types'
import React from 'react'

type Props = {
    invoice: ArdArtInvoiceResult,
    product: ArdArtAssetDetailByIDResult,
    priceToUsdRate: number,
}

function InvoiceFeature({ invoice, product, priceToUsdRate }: Props) {
    return (
        <div className="flex w-full h-full">
            <PaymentMethodCard priceToUsdrate={priceToUsdRate} invoice={invoice} item={product} />
        </div>
    )
}

export default InvoiceFeature