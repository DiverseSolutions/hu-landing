import { ArdArtTicketOrAssetRecord } from '@/store/rtk-query/hux-ard-art/types'
import React, { useState, useMemo, useEffect } from 'react'
import HeartSvg from '@/assets/svg/heart-black.svg'
import ShareSvg from '@/assets/svg/share-black.svg'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store/hooks'
import { showAuthModal } from '@/store/reducer/auth-reducer/actions'
import { useInvoiceSingleMutation, useLazyCheckInvoiceQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import moment from 'moment'
import DateRangeSvg from '@/assets/svg/date-range.svg'
import StadiumOutlineSvg from '@/assets/svg/stadium-outline.svg'
import ConfirmationOutlineSvg from '@/assets/svg/confirmation-outline.svg'

type Props = {
    ticket: ArdArtTicketOrAssetRecord,
    priceToUsdRate: number,
}

function TicketSection({ ticket, priceToUsdRate }: Props) {

    const [callCheckInvoice] = useLazyCheckInvoiceQuery()
    const [callInvoiceSingle] = useInvoiceSingleMutation()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const accountId = useAppSelector(state => state.auth.ardArt.accountId);
    const dispatch = useDispatch()
    const [isPurchaseLoading, setIsPurchaseLoading] = useState(false)
    const router = useRouter()

    const [isCountdownFinished, setIsCountdownFinished] = useState(() => {
        const mFinishDate = moment(ticket.finishDate);
        if (mFinishDate.isValid()) {
            const duration = moment.duration(mFinishDate.diff(moment()))
            return duration.asSeconds() <= 0
        } else {
            return false
        }
    })

    const [countDownValue, setCountDownValue] = useState<moment.Duration | undefined>(() => {
        const mFinishDate = moment(ticket.finishDate);
        if (mFinishDate.isValid()) {
            const duration = moment.duration(mFinishDate.diff(moment()))
            return duration
        }
        return undefined
    })

    const priceUsd = useMemo(() => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(ticket.price * priceToUsdRate)
    }, [ticket, priceToUsdRate])

    const priceFormatted = useMemo(() => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(ticket.price).substring(1)
    }, [ticket])

    useEffect(() => {
        const intervalId = setInterval(() => {
            const mFinishDate = moment(ticket.finishDate);
            if (mFinishDate.isValid()) {
                const duration = moment.duration(mFinishDate.diff(moment()))
                console.log(duration.days())
                setCountDownValue(duration)
            }
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])

    const handlePurchase = async () => {
        if (!isLoggedIn || !accountId) {
            dispatch(showAuthModal({
                type: 'login'
            }))
            return;
        }
        setIsPurchaseLoading(true)
        try {
            const r = await callInvoiceSingle({
                accountId,
                productId: ticket.id,
                amount: 1,
            }).unwrap()
            const invoiceResp = await callCheckInvoice({
                invoiceId: r.result.invoiceId
            }).unwrap()
            if (invoiceResp.status.toUpperCase() === 'SUCCESS') {
                toast("Purchase Successful.", {
                    type: 'success',
                    onClick: () => {
                        router.push('/profile')
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
        setIsPurchaseLoading(false)
    }

    return (
        <>
            <div>
                <div className="flex justify-center w-full pb-16 mt-4">
                    <div className="container md:max-w-[1024px]">
                        <div className="flex justify-between w-full">
                            <div className="w-[60%]">
                                <div className="relative w-full">
                                    <img src={ticket.imageUrl} alt={ticket.name} className="object-cover w-full h-auto" />
                                </div>
                                <div className="mt-6">
                                    <p className="text-2xl font-bold">Description</p>
                                </div>
                                <div className="mt-6">
                                    {ticket.description}
                                </div>
                                <div className="mt-6">
                                    <p className="text-2xl font-bold">Detail</p>
                                </div>
                                <div className="mt-6">
                                    {ticket.description}
                                </div>
                                <div className="mt-6">
                                    <div className="border-2 p-6 rounded-lg border-black border-opacity-[0.2] space-y-4">
                                        <div className="flex items-center w-full">
                                            <DateRangeSvg />
                                            <p className="ml-4 font-bold text-black text-opacity-[0.65]">{moment(ticket.finishDate).isValid() ? moment(ticket.finishDate).format('YYYY-MM-DD') : ''}</p>
                                        </div>
                                        <div className="flex items-center w-full">
                                            <StadiumOutlineSvg />
                                            <p className="ml-4 font-bold text-black text-opacity-[0.65]">{'Metaland'}</p>
                                        </div>
                                        <div className="flex items-center w-full">
                                            <ConfirmationOutlineSvg />
                                            <p className="ml-4 font-bold text-black text-opacity-[0.65]">197’000 / <span className='text-opacity-[0.02]'>2’000’000</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='ml-[50px] w-[40%]'>
                                <div className="rounded-lg border-[1px] border-black border-opacity-[0.1] p-6">
                                    <div className="flex justify-between w-full">
                                        <div className='p-3 rounded-lg cursor-pointer bg-black bg-opacity-[0.04]'>
                                            <HeartSvg />
                                        </div>
                                        <div className='p-3 rounded-lg cursor-pointer bg-black bg-opacity-[0.04]'>
                                            <ShareSvg />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p>Hosted by The Hu</p>
                                        <p className='text-lg font-bold'>{ticket.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <p className='text-black text-opacity-[0.65] mb-3'>Countdown</p>
                                        <div className="mt-4 bg-black bg-opacity-[0.04] p-4 rounded-lg flex w-full justify-center">
                                            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                                                <div className="flex items-center justify-center min-w-[44px] min-h-[44px] p-3 rounded-lg space-x-1 text-black bg-white">
                                                    <span className="font-mono text-xl countdown">
                                                        <span className='font-bold' style={{ "--value": countDownValue?.days() || 0 } as any}></span>
                                                    </span>
                                                    <span className='text-sm'>d</span>
                                                </div>
                                                <div className="flex items-center justify-center min-w-[44px] min-h-[44px] p-3 rounded-lg space-x-1 text-black bg-white">
                                                    <span className="font-mono text-xl countdown">
                                                        <span className='font-bold' style={{ "--value": countDownValue?.hours() || 0 } as any}></span>
                                                    </span>
                                                    <span className='text-sm'>h</span>
                                                </div>
                                                <div className="flex items-center justify-center min-w-[44px] min-h-[44px] p-3 rounded-lg space-x-1 text-black bg-white">
                                                    <span className="font-mono text-xl countdown">
                                                        <span className='font-bold' style={{ "--value": countDownValue?.minutes() || 0 } as any}></span>
                                                    </span>
                                                    <span className='text-sm'>m</span>
                                                </div>
                                                <div className="flex items-center justify-center min-w-[44px] min-h-[44px] p-3 rounded-lg space-x-1 text-black bg-white">
                                                    <span className="font-mono text-xl countdown">
                                                        <span className='font-bold' style={{ "--value": countDownValue?.seconds() || 0 } as any}></span>
                                                    </span>
                                                    <span className='text-sm'>s</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="p-4 rounded-lg bg-black bg-opacity-[0.04]">
                                            <div className="flex flex-col">
                                                <p className='text-black text-opacity-[0.65]'>Price</p>
                                                <p className="text-2xl font-bold">{priceUsd}</p>
                                                <p className='text-black text-opacity-[0.65]'>ARDX {priceFormatted}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button onClick={handlePurchase} className={classNames("btn btn-primary rounded-lg btn-block", { 'loading': isPurchaseLoading })}>Buy now for {priceUsd}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TicketSection