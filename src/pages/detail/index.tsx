import HomeFooter from '@/components/footer/HomeFooter'
import Navbar from '@/components/Navbar'
import BundleDetailFeature from '@/features/detail/BundleDetailFeature'
import ProductDetailFeature from '@/features/product/ProductDetailFeature'
import { useAssetDetailQuery, useBundleDetailQuery, useLazyArdxUsdRateQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useMemo } from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {}

function DetailPage({ }: Props) {

    const [pageError, setPageError] = useState<string>()
    const router = useRouter()
    const [bundleId, setBundleId] = useState<number>()
    const [productId, setProductId] = useState<number>()

    const [usdToArdxRate, setUsdToArdxRate] = useState(0)
    const [callArdxToUsdRate] = useLazyArdxUsdRateQuery()

    useEffect(() => {
        (async () => {
            try {
                await fetchUsdToArdxRate()
            } catch (e) {
                console.log(`rate error:`)
                console.log(e)
                setPageError("Currency Rate Error. Please try reload the page.")
            }
        })()
    }, [])

    const fetchUsdToArdxRate = async () => {
        const [ardxUsdRate] = await Promise.all([
            callArdxToUsdRate().unwrap()
        ]);
        if (!ardxUsdRate.result) {
            return;
        }
        const ardxToUsd = ardxUsdRate.result.sell
        if (ardxToUsd) {
            setUsdToArdxRate(ardxToUsd)
        }
    }

    const { data: bundleData, } = useBundleDetailQuery({
        id: bundleId!
    }, {
        skip: !bundleId
    })

    const { data: itemData } = useAssetDetailQuery({
        id: productId!
    }, {
        skip: !productId
    })

    const isLoading = useMemo(() => {
        return !itemData && !bundleData && !usdToArdxRate
    }, [itemData, bundleData, usdToArdxRate])

    useEffect(() => {
        if (!router.isReady) {
            return
        }
        if (!router.query.bundle && !router.query.product) {
            setPageError(`Bundle or Product not found.`)
        }
        setBundleId(parseInt(`${router.query.bundle}`))
        setProductId(parseInt(`${router.query.product}`))
    }, [router.isReady])

    if (pageError) {
        return (
            <>
                <Navbar />
                <div>
                    {pageError || "An unknown error occured. Please try reload the page."}
                </div>
                <HomeFooter isVisible={true} />
            </>
        )
    }

    if (isLoading) {
        return (
            <>
                <div className="w-screen h-screen overflow-hidden">
                    <Navbar />
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
                    <Navbar />
                    <BundleDetailFeature bundle={bundleData.result} />
                </div>
            </>
        )
    }

    if (itemData?.result) {
        return (
            <>
                <div>
                    <Navbar />
                    <ProductDetailFeature usdToArdxRate={usdToArdxRate} item={itemData?.result} />
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div>
                {pageError || "An unknown error occured. Please try reload the page."}
            </div>
            <HomeFooter isVisible={true} />
        </>
    )
}

export default DetailPage