import { ArdArtTicketOrAssetRecord } from '@/store/rtk-query/hux-ard-art/types'
import React, { useState, useMemo, useEffect } from 'react'
import HeartSvg from '@/assets/svg/heart-grey.svg'
import ShareSvg from '@/assets/svg/share-grey.svg'
import ZondReloadSvg from '@/assets/svg/zond-reload-grey.svg'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store/hooks'
import { showAuthModal } from '@/store/reducer/auth-reducer/actions'
import { useGetTicketOrAssetQuery, useInvoiceSingleMutation, useLazyCheckInvoiceQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import moment from 'moment'
import PlusGrey from '@/components/icon/svgr/PlusGrey'
import DateRangeSvg from '@/assets/svg/date-range.svg'
import StadiumOutlineSvg from '@/assets/svg/stadium-outline.svg'
import ConfirmationOutlineSvg from '@/assets/svg/confirmation-outline.svg'
import Clock from '@/components/icon/svgr/Clock'
import { MdOutlineLocationOn } from 'react-icons/md'

import { formatPrice } from '@/lib/utils'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'


type Props = {
    ticket: ArdArtTicketOrAssetRecord,
    priceToUsdRate: number,
}

function TicketSection({ ticket, priceToUsdRate }: Props) {

    const { data: tickets, isLoading: isTicketsLoading } = useGetTicketOrAssetQuery({
        subTag: ticket.tag,
        type: "ticket"
    })

    const [selectedTicketId, setSelectedTicketId] = useState<number>()

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const accountId = useAppSelector(state => state.auth.ardArt.accountId);
    const dispatch = useDispatch()
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
        return formatPrice(ticket.price)
    }, [ticket])

    useEffect(() => {
        if (tickets?.result?.records?.length) {
            setSelectedTicketId(tickets.result.records[0].id)
        }
    }, [tickets])


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
        if (!selectedTicketId) {
            toast('Please select your ticket', {
                type: 'warning'
            })
            return
        }
        try {
            router.push(`/payment?productId=${selectedTicketId}`)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div>
                <div className="flex justify-center w-full pb-16 mt-4">
                    <div className="container lg:max-w-[70vw] 2xl:max-w-[1300px] mw-md:px-4">
                        <div className="flex flex-col justify-between w-full md:flex-row">
                            <div className="md:w-[60%] mw-md:order-2 mw-md:mt-8">
                                <div className="relative w-full">
                                    <img src={ticket.imageUrl} alt={ticket.name} className="object-cover w-full h-auto rounded-lg" />
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
                            <div className='md:ml-[50px] md:w-[40%] mw-md:order-1'>
                                <div className="flex flex-col w-full">
                                    <div className="rounded-lg border-[1px] border-black border-opacity-[0.1] p-6">
                                        <div>
                                            <p className='text-sm opacity-[0.65]'>Hosted by The Hu</p>
                                            <p className='text-2xl font-bold max-w-[250px]'>
                                                {ticket.name}
                                            </p>
                                            <div className="my-6 border border-black border-opacity-[0.1]">
                                            </div>
                                            <div className='flex items-center px-2 space-x-8'>
                                                <HeartSvg />
                                                <div className="flex items-center cursor-not-allowed">
                                                    <ZondReloadSvg />
                                                    <span className="ml-2 text-xs opacity-[0.65]">
                                                        Refresh
                                                    </span>
                                                </div>
                                                <div className="flex items-center cursor-not-allowed">
                                                    <ShareSvg />
                                                    <span className="ml-2 text-xs opacity-[0.65]">
                                                        Share
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-black rounded-lg border-opacity-[0.1] p-6 mt-4">
                                        <div className='flex items-center'>
                                            <Clock size={24} />
                                            <p className='text-black text-sm text-opacity-[0.65] ml-1'>Sale ends {moment("2023-03-04 03:18:00").utcOffset("+08:00").format("MMMM D, YYYY [at] hh:mm A Z")}</p>
                                        </div>
                                        <div className="mt-4">
                                            <div className="p-4 rounded-lg bg-black bg-opacity-[0.04]">
                                                <div className="flex flex-col">
                                                    <p className='text-black text-sm text-opacity-[0.65]'>Current price</p>
                                                    <div className="flex items-center text-2xl font-bold">{priceFormatted} ARDX <span className="ml-2 text-sm font-[300] text-black text-opacity-[0.65]">{priceUsd}</span> </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className='flex items-center'>
                                                <MdOutlineLocationOn size={24} opacity={0.65} />
                                                <p className='text-black text-sm text-opacity-[0.65] ml-1'>Choose timezone that matches you</p>
                                            </div>
                                            <div className="mt-4">
                                                <div className="flex flex-col w-full">
                                                    {isTicketsLoading ? <ClipLoader color="black" /> : <></>}
                                                    {!isTicketsLoading && tickets?.result?.records?.length ? (
                                                        <div className='flex flex-col w-full space-y-4'>
                                                            {tickets.result.records.map((ticket) => (
                                                                <button key={ticket.id}
                                                                    onClick={() => {
                                                                        setSelectedTicketId(ticket.id)
                                                                    }}
                                                                    className={classNames(`text-sm border`, { 'btn btn-black border-transparent p-3': selectedTicketId === ticket.id, 'bg-white hover:bg-black hover:bg-opacity-[0.04] p-3 border rounded-lg text-black': selectedTicketId !== ticket.id })}>
                                                                    {ticket.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    ) : (<></>)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex w-full">
                                                <div className="flex flex-grow">
                                                    <button onClick={handlePurchase} className={classNames("btn btn-primary rounded-lg btn-block")}>Buy now for {priceUsd}</button>
                                                </div>
                                                <div className="flex ml-2">
                                                    <div className="btn hover:bg-opacity-[0.12] btn-disabled bg-opacity-[0.2] rounded-lg">
                                                        <PlusGrey />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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