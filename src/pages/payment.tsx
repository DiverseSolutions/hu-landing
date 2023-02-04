import PageLoader from '@/components/loader/PageLoader'
import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import invoiceLeft from '@/assets/img/invoice-left.png'
import invoiceRight from '@/assets/img/invoice-right.png'
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
                    <div className="absolute inset-0 hidden overflow-auto md:block">
                        <div className="relative hidden w-full h-full">
                            <div className="w-[512px] h-full relative">
                                <img src={invoiceLeft.src} className="object-contain w-full h-auto mix-blend-darken" />

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
                    <div className="absolute inset-0">
                        {invoiceData?.result ? (
                            <>
                                <div className="flex justify-center w-full">
                                    <div className="flex mt-8 md:mt-32">
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