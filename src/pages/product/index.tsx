import Navbar from '@/components/Navbar'
import ProductDetailFeature from '@/features/product/ProductDetailFeature'
import { useAppDispatch } from '@/store/hooks'
import { pageError } from '@/store/reducer/error-reducer/actions'
import { useAssetDetailQuery, useLazyAssetDetailQuery, useLazyBundleDetailQuery, useLazyCheckCouponQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useMemo } from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {
}

function ProductPage({ }: Props) {

    const router = useRouter()
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [callAsset, { data: itemData }] = useLazyAssetDetailQuery()
    const [callCoupon, { data: couponData }] = useLazyCheckCouponQuery()
    const [couponCode, setCouponCode] = useState<string>()

    useEffect(() => {
        if (!router.isReady) {
            return
        }
        if (!router.query.id) {
            dispatch(pageError({ message: "Product not found" }))
        }
        const productId = parseInt(`${router.query.id}`)
        if (!productId) {
            dispatch(pageError({
                message: `Product ID not found.`
            }))
            return;
        }
        (async () => {
            setIsLoading(true)
            await callAsset({
                id: productId,
            })

            const coupon = router.query.coupon as string | undefined
            if (coupon) {
                setCouponCode(coupon)
                await callCoupon({
                    code: coupon,
                })
            }
            setIsLoading(false)
        })()
    }, [router.isReady])

    if (isLoading) {
        return (
            <>
                <div className="w-screen h-screen overflow-hidden">
                    <div className="flex transform translate-y-[-96px] items-center justify-center w-screen h-screen">
                        <ClipLoader />
                    </div>
                </div>
            </>
        )
    }

    if (itemData?.result) {
        return (
            <>
                <div>
                    <ProductDetailFeature
                        item={itemData?.result}
                        coupon={couponData?.result && couponCode ? {
                            coupon: couponData.result,
                            code: couponCode,
                        } : undefined} />
                </div>
            </>
        )
    }
    return <></>
}

export default ProductPage