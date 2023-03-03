import HomeFooter from '@/components/footer/HomeFooter'
import Navbar from '@/components/Navbar'
import BundleDetailFeature from '@/features/detail/BundleDetailFeature'
import ItemDetailFeature from '@/features/detail/ItemDetailFeature'
import { useAssetDetailQuery, useBundleDetailQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useMemo } from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {}

function DetailPage({ }: Props) {

    const [pageError, setPageError] = useState<string>()
    const router = useRouter()
    const [bundleId, setBundleId] = useState<number>()
    const [itemId, setItemId] = useState<number>()

    const { data: bundleData, } = useBundleDetailQuery({
        id: bundleId!
    }, {
        skip: !bundleId
    })

    const { data: itemData } = useAssetDetailQuery({
        id: itemId!
    }, {
        skip: !itemId
    })

    const isLoading = useMemo(() => {
        return !itemData && !bundleData
    }, [itemData, bundleData])

    useEffect(() => {
        if (!router.isReady) {
            return
        }
        if (!router.query.bundle && !router.query.item) {
            setPageError(`Bundle or Item not found.`)
        }
        setBundleId(parseInt(`${router.query.bundle}`))
        setItemId(parseInt(`${router.query.item}`))
    }, [router.isReady])

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
                    <ItemDetailFeature item={itemData?.result} />
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