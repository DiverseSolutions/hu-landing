import { retrieveBundle, retrieveProduct } from '@/lib/wv/idax/persistence'
import { useAppSelector } from '@/store/hooks'
import { useCreateIdaxInvoiceMutation } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {}

function WebViewIdax({ }: Props) {

    const router = useRouter()
    const [pageError, setPageError] = useState<string>()
    const [callCreateIdaxInvoice] = useCreateIdaxInvoiceMutation()
    const isLoading = !pageError
    const accountId = useAppSelector(state => state.auth.ardArt.accountId)
    const email = useAppSelector(state => state.auth.profile.email)
    const idaxUserId = useAppSelector(state => state.auth.idax?.id)

    useEffect(() => {
        if (!router.isReady) {
            return
        }
        if (!accountId) {
            return
        }
        const idaxUserCode = router.query.code as string | undefined
        if (!idaxUserCode) {
            setPageError("IDAX User code not found")
            return
        }
        if (!idaxUserId) {
            return
        }
        const product = retrieveProduct()
        if (product) {
            handlePurchaseProduct({
                id: product.productId,
                region: product.region || undefined,
                idaxUserId: idaxUserId.toString(),
                idaxUserCode,
            })
            return
        }
        const bundle = retrieveBundle()
        if (bundle) {
            handlePurchaseBundle({
                id: bundle.bundleId,
                region: bundle.region,
                idaxUserId: idaxUserId.toString(),
                idaxUserCode
            })
            return
        }
    }, [router.isReady, accountId, email, idaxUserId])

    const handlePurchaseProduct = async (d: {
        id: number,
        region?: string,
        idaxUserId: string,
        idaxUserCode: string
    }) => {
        const r = await callCreateIdaxInvoice({
            productId: d.id,
            accountId,
            email: email!,
            type: 'single',
            region: d.region,
            amount: 1,
            idaxUserId: d.idaxUserId,
            idaxUserCode: d.idaxUserCode
        }).unwrap()
        if (r.result) {
            window.location.href = r.result.response.url
        }
    }

    const handlePurchaseBundle = async (d: {
        id: number,
        region: string,
        idaxUserId: string,
        idaxUserCode: string
    }) => {
        const r = await callCreateIdaxInvoice({
            bundleId: d.id,
            accountId: accountId,
            email: email!,
            type: 'bundle',
            region: d.region,
            amount: 1,
            idaxUserId: d.idaxUserId,
            idaxUserCode: d.idaxUserCode
        }).unwrap()
        if (r.result) {
            window.location.href = r.result.response.url
        }
    }

    if (pageError) {
        return (
            <div className="w-full h-screen overflow-hidden bg-black">
                <div className="flex items-center justify-center w-full h-full">
                    <p className="text-white">{pageError}</p>
                </div>
            </div>
        )
    }
    if (isLoading) {
        return (
            <div className="w-full h-screen overflow-hidden bg-black">
                <div className="flex items-center justify-center w-full h-full">
                    <ClipLoader color='white' />
                </div>
            </div>
        )
    }
    return (
        <div className="w-full h-screen overflow-hidden bg-black">
            <div className="flex items-center justify-center w-full h-full">
                <p className="text-white">An unknown error occured. Please try reload the page.</p>
            </div>
        </div>
    )
}

export default WebViewIdax