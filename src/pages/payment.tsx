import PageLoader from '@/components/loader/PageLoader'
import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useMemo } from 'react'
import invoiceLeft from '@/assets/img/invoice-left.png'
import invoiceRight from '@/assets/img/invoice-right.png'
import { useBundleDetailQuery, useLazyBundleDetailQuery, useLazyGetInvoiceByIdQuery, useLazyMonxanshRateQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import InvoiceFeature from '@/features/payment/InvoiceFeature'
import { useLazyGetAssetDetailByIdQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { ArdArtAssetDetailByIDResult, ArdArtBundleDetailResult } from '@/store/rtk-query/hux-ard-art/types'
import { useLazyIdaxTickerQuery } from '@/store/rtk-query/idax-openapi/idax-openapi'
import DesktopBehindNavbar from '@/components/layout/DesktopBehindNavbar'
import BehindNavbar from '@/components/layout/BehindNavbar'

type Props = {}

const SUPPORTED_REGIONS = ['ASIA', 'EUROPE', 'USA']

const Payment = (props: Props) => {

    const [ardxToUsdRate, setArdxToUsdRate] = useState(0)
    const [callMonxanshRate] = useLazyMonxanshRateQuery()
    const [callIdaxTicker] = useLazyIdaxTickerQuery()

    const [pageErrorMessage, setPageErrorMessage] = useState<string>()
    const [callGetInvoice] = useLazyGetInvoiceByIdQuery()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isAuthLoading = useAppSelector(state => state.auth.isLoading)
    const accountId = useAppSelector(state => state.auth.ardArt.accountId)
    const router = useRouter()
    const [region, setRegion] = useState<string>()

    const [assetData, setAssetData] = useState<ArdArtAssetDetailByIDResult>()
    const [bundleData, setBundleData] = useState<ArdArtBundleDetailResult>()
    const [isLoading, setIsLoading] = useState(true)

    const [callAssetDetailById] = useLazyGetAssetDetailByIdQuery()
    const [callBundleDetail] = useLazyBundleDetailQuery()


    useEffect(() => {
        if (!router.isReady) {
            return
        }
        (async () => {
            if (!isAuthLoading && accountId) {
                try {
                    await loadData()
                } catch (e) {
                    console.log(e)
                    setPageErrorMessage("An Error Eccoured. Please try reload the page.")
                }
            }
            if (!isAuthLoading && !accountId) {
                setPageErrorMessage("Account not found.")
            }
        })()
    }, [isAuthLoading, accountId, router.isReady])

    useEffect(() => {
        if (pageErrorMessage) {
            setIsLoading(false)
        }
        if (accountId && !isAuthLoading && ardxToUsdRate && (assetData || bundleData)) {
            setIsLoading(false)
        }
    }, [accountId, isAuthLoading, pageErrorMessage, ardxToUsdRate, assetData, bundleData])

    const fetchArdxToUsdRate = async () => {
        const [usdMntRate, ardxMntRate] = await Promise.all([
            callMonxanshRate({ currency: 'USD|MNT' }).unwrap(),
            callIdaxTicker({ symbol: 'ardx1557mont' }).unwrap()
        ]);
        if (!usdMntRate.result) {
            return undefined
        }
        const usdRate = usdMntRate.result.find((r) => r.code === 'USD');
        if (usdRate) {
            const ardxToUsd = parseFloat(ardxMntRate.last) / usdRate.rate_float
            setArdxToUsdRate(ardxToUsd)
            return ardxToUsd;
        }
        return undefined;
    }

    const loadData = async () => {
        const productId = parseInt(router.query.productId as string);
        const bundleId = parseInt(router.query.bundleId as string);
        if (!productId && !bundleId) {
            setPageErrorMessage("Product or Bundle not found.")
            return;
        }
        const region = router.query.region as string | undefined;
        setRegion(region)
        if (!accountId) {
            console.log(`accountId not found`)
            setPageErrorMessage("Account not found.")
            return;
        }
        if (productId) {
            const asset = await callAssetDetailById({
                id: productId,
            })
            const assetData = asset.data?.result
            if (!assetData) {
                setPageErrorMessage("Product not found")
                return;
            }
            setAssetData(assetData)
        } else if (bundleId) {
            const bundle = await callBundleDetail({
                id: bundleId,
            })
            if (bundle.data?.result) {
                setBundleData(bundle.data?.result)
            } else {
                setPageErrorMessage("Bundle not found")
                return;
            }
        }

        const ardxToUsdRate = await fetchArdxToUsdRate()
        if (ardxToUsdRate) {
            setArdxToUsdRate(ardxToUsdRate)
        } else {
            setPageErrorMessage("A currency error occured. Please try reload the page")
            return;
        }
    }

    if (pageErrorMessage) {
        return (
            <>
                <div className="flex items-center justify-center w-screen h-screen">
                    {pageErrorMessage}
                </div>
            </>
        )
    }

    if (isLoading) {
        return (
            <>
                <PageLoader classNames='w-full h-[100vh] flex justify-center items-center' />
            </>
        )
    }
    if (!isLoggedIn) {
        return (
            <div>
                Please Log In to Continue.
            </div>
        )
    }
    return (
        <>
            <BehindNavbar>
                <div className="w-full h-screen overflow-y-auto">
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 hidden overflow-auto md:block">
                            <div className="relative w-full h-full">
                                <div className="w-[512px] h-[120vh] relative">
                                    <img src={invoiceLeft.src} className="object-cover w-auto h-full mix-blend-darken" />
                                </div>
                            </div>
                            <div className="absolute inset-0 transform rounded-full aspect-square">
                                <div className="h-[120vh] transform translate-x-[-50%] rounded-full aspect-square" style={{
                                    background: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 20.23%, #FFFFFF 80.12%)',
                                }}>

                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 hidden md:block">
                            <div className="relative w-full h-full ">
                                <div className="absolute top-0 bottom-0 right-0">
                                    <div className="min-w-[33vw] h-full relative flex justify-end">
                                        <img src={invoiceRight.src} className="object-cover w-full h-auto mix-blend-darken" />
                                        <div className="absolute inset-0" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 48.23%, #FFFFFF 150%)' }}>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 overflow-y-auto">
                            {(assetData || bundleData) ? (
                                <>
                                    <div className="flex items-center justify-center w-full h-full">
                                        <div className="flex">
                                            <InvoiceFeature isBundle={bundleData ? true : false} region={region} product={(assetData || bundleData)!} priceToUsdRate={ardxToUsdRate} />
                                        </div>
                                    </div>
                                </>
                            ) : <></>}
                            {!(assetData || bundleData) ? <p>Asset or Bundle not found</p> : <></>}
                        </div>
                    </div>
                </div>
            </BehindNavbar>
        </>
    )
}

export default Payment