import PaymentStatusCard from '@/components/card/PaymentStatusCard'
import { ArdArtGetInvoiceByIdResult, ArdArtAssetDetailByIDResult } from '@/store/rtk-query/hux-ard-art/types'
import { ArdArtCheckInvoiceResult } from '@/store/rtk-query/hux-ard-art/types'
import React from 'react'

type Props = {
    invoice: ArdArtGetInvoiceByIdResult,
    checkInvoice?: ArdArtCheckInvoiceResult,
    product: ArdArtAssetDetailByIDResult,
    priceToUsdRate: number,
    type: PaymentType,
    bank?: string
}

export type PaymentType = 'card' | 'socialpay' | 'ardapp' | 'socialpay' | 'mongolian-banks'

function PaymentStatusFeature({ invoice, product, priceToUsdRate, type, ...props }: Props) {
    return (
        <div className="flex w-full h-full">
            <PaymentStatusCard checkInvoice={props.checkInvoice} type={type} bank={props.bank} priceToUsdrate={priceToUsdRate} invoice={invoice} item={product} />
        </div>
    )
}

export default PaymentStatusFeature