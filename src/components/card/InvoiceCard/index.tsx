import { ArdArtInvoiceResult } from '@/store/rtk-query/ard-art/types'
import React, { useState } from 'react'

import ArdImg from '@/assets/img/ard.jpg'
import VisaSvg from '@/assets/svg/visa.svg'
import Image from 'next/image'
import { useUpdateInvoiceSocialPayMutation } from '@/store/rtk-query/ard-art/ard-art-api'
import classNames from 'classnames'

type Props = {
    invoice: ArdArtInvoiceResult
}

function InvoiceCard({ invoice }: Props) {

    const [selected, setSelected] = useState('')
    const [callUpdateInvoiceSocialPay, { isLoading: isSocialPayLoading }] = useUpdateInvoiceSocialPayMutation()

    const handleConfirm = async () => {
        const r = await callUpdateInvoiceSocialPay({
            invoiceId: invoice.id,
        }).unwrap()
        if (r.result?.response?.invoice) {
            window.location.href = `https://ecommerce.golomtbank.com/payment/mn/${r.result.response.invoice}`
        }
    }

    return (
        <div className="shadow-xl card w-96 bg-base-100">
            <div className="card-body">
                <h2 className="card-title">Invoice Id: {invoice.id}</h2>
                <div className="flex flex-col w-full">
                    <div onClick={() => {
                        setSelected('socialpay')
                    }} className="cursor-pointer mt-4 border-2 rounded-lg bg-black bg-opacity-[0.04] p-4 w-full flex items-center">
                        <VisaSvg />
                        <p className="ml-3">Credit & Debit Card</p>
                    </div>
                    <div className="mt-4 opacity-[0.5] rounded-lg bg-black bg-opacity-[0.04] p-4 w-full flex items-center">
                        <Image src={ArdImg} width={48} height={48} alt="Ard" />
                        <p className="ml-3">Ard App (available with ARDX)</p>
                    </div>
                </div>
                <div className="justify-end mt-6 card-actions">
                    <button onClick={handleConfirm} className={classNames("btn btn-primary btn-block", { 'loading': isSocialPayLoading })}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default InvoiceCard