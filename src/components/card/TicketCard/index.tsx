import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { showAuthModal } from '@/store/reducer/auth-reducer/actions'
import { useCheckInvoiceQuery, useInvoiceSingleMutation, useLazyCheckInvoiceQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { ArdArtTicketOrAssetRecord } from '@/store/rtk-query/hux-ard-art/types'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
    ticket: ArdArtTicketOrAssetRecord
}

export default function TicketCard({ ticket: t }: Props) {

    const [isPurchaseLoading, setIsPurchaseLoading] = useState(false)
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const accountId = useAppSelector(state => state.auth.ardArt.accountId)
    const [callInvoiceSingle, { isLoading: isInvoiceLoading }] = useInvoiceSingleMutation()
    const [callCheckInvoice, { isLoading: isCheckInvoiceLoading }] = useLazyCheckInvoiceQuery()
    const router = useRouter()
    const handlePurchase = async () => {
        if (!isLoggedIn || !accountId) {
            dispatch(showAuthModal({
                type: 'login'
            }))
            return;
        }
        setIsPurchaseLoading(true)
        try {
            const r = await callInvoiceSingle({
                accountId,
                productId: t.id,
                amount: 1,
            }).unwrap()
            const invoiceResp = await callCheckInvoice({
                invoiceId: r.result.invoiceId
            }).unwrap()
            if (invoiceResp.status.toUpperCase() === 'SUCCESS') {
                toast("Purchase Successful.", {
                    type: 'success',
                    onClick: () => {
                        router.push('/profile')
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
        setIsPurchaseLoading(false)
    }

    return (
        <div className="shadow-xl card w-96 bg-base-100">
            <figure><img src={t.imageUrl} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{t.name}</h2>
                <p>{t.description}</p>
                <div className="justify-end card-actions">
                    <button onClick={handlePurchase} className={classNames("btn btn-primary", { 'loading': isInvoiceLoading })}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}