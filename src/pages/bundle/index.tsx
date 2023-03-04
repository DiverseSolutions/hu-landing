import HomeFooter from '@/components/footer/HomeFooter'
import Navbar from '@/components/Navbar'
import BundleDetailFeature from '@/features/detail/BundleDetailFeature'
import ProductDetailFeature from '@/features/product/ProductDetailFeature'
import { useAppDispatch } from '@/store/hooks'
import { pageError } from '@/store/reducer/error-reducer/actions'
import { useAssetDetailQuery, useBundleDetailQuery, useUsdToArdxRateQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useMemo } from 'react'
import { MdChevronLeft } from 'react-icons/md'
import { ClipLoader } from 'react-spinners'

type Props = {}

function DetailPage({ }: Props) {

    const router = useRouter()
    const [bundleId, setBundleId] = useState<number>()
    const dispatch = useAppDispatch()

    const { data: bundleData, isLoading: isBundleLoading } = useBundleDetailQuery({
        id: bundleId!
    }, {
        skip: !bundleId
    })

    const isLoading = useMemo(() => {
        return !bundleData
    }, [bundleData])

    useEffect(() => {
        if (!router.isReady) {
            return
        }
        if (!router.query.id) {
            dispatch(pageError({
                message: `Bundle not found.`
            }))
        } else {
            setBundleId(parseInt(`${router.query.id}`))
        }
    }, [router.isReady, bundleData, isBundleLoading])

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
                    <BundleDetailFeature bundle={bundleData.result} />
                </div>
            </>
        )
    }
    return <></>
}

export default DetailPage