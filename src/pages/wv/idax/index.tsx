import { retrieveBundle, retrieveProduct } from '@/lib/wv/idax/persistence'
import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {}

function WebViewIdax({ }: Props) {

    const router = useRouter()
    const [pageError, setPageError] = useState<string>()
    const isLoading = !pageError

    useEffect(() => {
        if (!router.isReady) {
            return
        }
        const idaxUserCode = router.query.code as string | undefined
        if (!idaxUserCode) {
            router.push('/')
            return
        }
        const product = retrieveProduct()
        if (product) {
            router.push(`/product/?id=${product.productId}&action=idaxPurchase&idaxUserCode=${idaxUserCode}${product.region ? `&region=${product.region}` : ''}`)
            return
        }
        const bundle = retrieveBundle()
        if (bundle) {
            router.push(`/bundle/?id=${bundle.bundleId}&region=${bundle.region}&action=idaxPurchase&idaxUserCode=${idaxUserCode}`)
            return
        }
        router.push('/')
    }, [router.isReady])

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