import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { showAuthModal } from '@/store/reducer/auth-reducer/actions'
import { useInvoiceBundleMutation, useLazyCheckInvoiceQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { ArdArtBundleRecord } from '@/store/rtk-query/hux-ard-art/types'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
    bundle: ArdArtBundleRecord
}

export default function BundleCard({ bundle: b }: Props) {

    const [isPurchaseLoading, setIsPurchaseLoading] = useState(false)
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const accountId = useAppSelector(state => state.auth.ardArt.accountId)
    const [callInvoiceBundle, { isLoading: isBundleInvoiceLoading }] = useInvoiceBundleMutation()
    const [callCheckInvoice, { isLoading: isCheckInvoiceLoading }] = useLazyCheckInvoiceQuery()
    const [currentImg, setCurrentImg] = useState(0)
    const router = useRouter()

    const handlePurchase = async () => {
        if (!isLoggedIn || !accountId) {
            dispatch(showAuthModal())
            return;
        }
        setIsPurchaseLoading(true)
        try {
            const r = await callInvoiceBundle({
                bundleId: b.id,
                accountId: accountId,
            }).unwrap()
            const invoiceResp = await callCheckInvoice({
                invoiceId: r.result.invoiceId,
            }).unwrap();
            if (invoiceResp.status.toUpperCase() === 'SUCCESS') {
                toast("Purchase successful.", {
                    type: 'success',
                    onClick: () => {
                        router.push('/profile')
                    }
                })
            }
        } catch (e) {

        }
        setIsPurchaseLoading(false)
    }

    return (
        <div className="shadow-xl card w-96 bg-base-100">
            <div className='max-w-md space-x-2 bg-slate-100 carousel carousel-center rounded-box'>{b.items.map((item, idx) => (
                <img key={item.id} onClick={() => {
                    if (b.items.length) {
                        setCurrentImg((currentImg + 1) % b.items.length)
                    }
                }} src={item.imageUrl} alt="Shoes" className='object-cover w-1/2 h-auto carousel-item' />
            ))}</div>
            <div className="card-body">
                <h2 className="card-title">{b.name}</h2>
                <p>{b.description}</p>
                <div className="justify-end card-actions">
                    <button onClick={handlePurchase} className={classNames("btn btn-primary", { 'loading': isPurchaseLoading })}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}