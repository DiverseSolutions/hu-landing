import HomeFooter from '@/components/footer/HomeFooter'
import Navbar from '@/components/Navbar'
import BundleDetailFeature from '@/features/detail/BundleDetailFeature'
import ProductDetailFeature from '@/features/product/ProductDetailFeature'
import { useAppDispatch } from '@/store/hooks'
import { pageError } from '@/store/reducer/error-reducer/actions'
import { useAssetDetailQuery, useBundleDetailQuery, useLazyBundleDetailQuery, useLazyCheckCouponQuery, useUsdToArdxRateQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { ArdArtCheckCouponResult } from '@/store/rtk-query/hux-ard-art/types'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useMemo } from 'react'
import { MdChevronLeft } from 'react-icons/md'
import { ClipLoader } from 'react-spinners'

type Props = {}

function DetailPage({ }: Props) {

    const router = useRouter()
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [couponCode, setCouponCode] = useState<string>()
    const [callBundle, { data: bundleData }] = useLazyBundleDetailQuery()
    const [callCoupon, { data: couponData }] = useLazyCheckCouponQuery()

    useEffect(() => {
        if (!router.isReady) {
            return
        }
        const bundleId = parseInt(`${router.query.id}`)
        if (!bundleId) {
            dispatch(pageError({
                message: `Bundle not found.`
            }))
            return;
        }
        (async () => {
            setIsLoading(true)
            await callBundle({
                id: bundleId,
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

    if (bundleData?.result) {
        return (
            <>
                <div>
                    <BundleDetailFeature bundle={bundleData.result} coupon={couponData?.result && couponCode ? {
                        coupon: couponData.result,
                        code: couponCode,
                    } : undefined} />
                </div>
            </>
        )
    }
    return <></>
}

export default DetailPage