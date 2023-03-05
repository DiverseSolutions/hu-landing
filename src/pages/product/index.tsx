import Navbar from '@/components/Navbar'
import ProductDetailFeature from '@/features/product/ProductDetailFeature'
import { useAppDispatch } from '@/store/hooks'
import { pageError } from '@/store/reducer/error-reducer/actions'
import { useAssetDetailQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useMemo } from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {
}

function ProductPage({ }: Props) {

    const router = useRouter()
    const [productId, setProductId] = useState<number>()
    const dispatch = useAppDispatch()
    const { data: itemData } = useAssetDetailQuery({
        id: productId!
    }, {
        skip: !productId
    })

    const isLoading = useMemo(() => {
        return !itemData
    }, [itemData])

    useEffect(() => {
        if (!router.isReady) {
            return
        }
        if (!router.query.id) {
            dispatch(pageError({ message: "Product not found" }))
        }
        setProductId(parseInt(`${router.query.id}`))
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
                    <ProductDetailFeature item={itemData?.result} />
                </div>
            </>
        )
    }
    return <></>
}

export default ProductPage