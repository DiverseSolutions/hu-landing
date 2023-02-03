import InvoiceCard from '@/components/card/InvoiceCard'
import { ArdArtInvoiceResult } from '@/store/rtk-query/ard-art/types'
import React from 'react'

type Props = {
    invoice: ArdArtInvoiceResult
}

function InvoiceFeature({ invoice }: Props) {
    return (
        <div className="flex w-full h-full">
            <InvoiceCard invoice={invoice} />
        </div>
    )
}

export default InvoiceFeature