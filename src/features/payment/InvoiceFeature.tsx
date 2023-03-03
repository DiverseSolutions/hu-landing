import PaymentMethodCard from '@/components/card/PaymentMethodCard'
import { ArdArtBundleDetailResult, ArdArtGetInvoiceByIdResult } from '@/store/rtk-query/hux-ard-art/types'
import { ArdArtAssetDetailByIDResult } from '@/store/rtk-query/hux-ard-art/types'
import React from 'react'

type Props = {
    product: ArdArtAssetDetailByIDResult | ArdArtBundleDetailResult,
    isBundle: boolean;
    region: string,
    priceToUsdRate: number,
}

function InvoiceFeature({ product, region, priceToUsdRate, isBundle }: Props) {
    return (
        <div className="flex w-full h-full">
            <PaymentMethodCard region={region} isBundle={isBundle} priceToUsdrate={priceToUsdRate} item={product} />
        </div>
    )
}

export default InvoiceFeature