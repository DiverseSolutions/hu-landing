import PageLoader from '@/components/loader/PageLoader'
import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import invoiceLeft from '@/assets/img/invoice-left.png'
import { useGetInvoiceQuery, useUpdateInvoiceSocialPayMutation } from '@/store/rtk-query/ard-art/ard-art-api'
import InvoiceFeature from '@/features/payment/InvoiceFeature'

type Props = {}


const Payment = (props: Props) => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isAuthLoading = useAppSelector(state => state.auth.isLoading)
    const accountId = useAppSelector(state => state.auth.ardArt.accountId)
    const router = useRouter()
    const { data: invoiceData, isLoading: isInvoiceLoading } = useGetInvoiceQuery({ invoiceId: parseInt(router.query.invoiceId as string) }, {
        skip: !(accountId && router.query.invoiceId)
    })

    const [isLoading, setIsLoading] = useState(!(isLoggedIn && !isInvoiceLoading && invoiceData))

    useEffect(() => {
        if (!isAuthLoading && invoiceData && !isInvoiceLoading) {
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
    }, [isAuthLoading, invoiceData, isInvoiceLoading])

    const handleConfirm = async () => {

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
            <div className="w-full h-screen">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 overflow-auto">
                        <div className="w-[512px] h-full">
                            <img src={invoiceLeft.src} className="object-contain w-full h-auto mix-blend-darken" />
                        </div>
                        <div className="absolute inset-0" style={{
                            background: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 48.23%, #FFFFFF 83.12%)',
                            transform: 'rotateX()'
                        }}>
                        </div>
                    </div>
                    <div className="absolute inset-0">
                        {invoiceData?.result ? (
                            <>
                                <div className="flex justify-center w-full">
                                    <div className="flex mt-32">
                                        <InvoiceFeature invoice={invoiceData.result} />
                                    </div>
                                </div>
                            </>
                        ) : <p>Invoice not found</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment