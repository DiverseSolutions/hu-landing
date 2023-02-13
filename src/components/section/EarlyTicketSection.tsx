import { ArdArtAssetDetailEarlyResult } from '@/store/rtk-query/hux-ard-art/types'
import React, { useState, useMemo, useEffect } from 'react'
import { sortBy as _sortBy } from 'lodash'
import HeartSvg from '@/assets/svg/heart-grey.svg'
import ShareSvg from '@/assets/svg/share-grey.svg'
import ZondReloadSvg from '@/assets/svg/zond-reload-grey.svg'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store/hooks'
import { showAuthModal } from '@/store/reducer/auth-reducer/actions'
import { useGetTicketOrAssetQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import moment from 'moment'
import PlusGrey from '@/components/icon/svgr/PlusGrey'
import LocationSvg from '@/assets/svg/location.svg'
import ZoomInSvg from '@/assets/svg/zoom-in.svg'

import Clock from '@/components/icon/svgr/Clock'
import { MdClose, MdOutlineLocationOn } from 'react-icons/md'

import { formatPrice } from '@/lib/utils'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import SystemRequirementsSection from './components/SystemRequirementsSection'
import MediaSection from './components/MediaSection'
import GalleryOverlay from './components/GalleryOverlay'


type Props = {
    ticket: ArdArtAssetDetailEarlyResult,
    priceToArdxRate: number,
}
function TicketSection({ ticket, priceToArdxRate }: Props) {

    const { data: tickets, isLoading: isTicketsLoading } = useGetTicketOrAssetQuery({
        subTag: ticket.tag,
        type: "ticket"
    })

    const [selectedTicketId, setSelectedTicketId] = useState<number>()

    const [isTimezoneWarningVisible, setIsTimezoneWarningVisible] = useState(true)

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

    const priceArdx = useMemo(() => {
        return formatPrice(ticket.price / priceToArdxRate)
    }, [ticket.price, priceToArdxRate])

    const priceFormatted = useMemo(() => {
        return formatPrice(ticket.price)
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
        if (!selectedTicketId) {
            toast('Please select your ticket timezone', {
                type: 'warning'
            })
            return
        }
        if (!isLoggedIn || !accountId) {
            dispatch(showAuthModal({
                type: 'login'
            }))
            return;
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
                                <div className="flex justify-center w-full">
                                    <div className="relative flex justify-center w-full max-w-[600px]">
                                        <img src={ticket.imageUrl} alt={ticket.name} className="object-cover w-full h-auto rounded-lg" />
                                        <div className="absolute top-4 right-4">
                                            <div className="rounded-xl cursor-pointer p-4 bg-white bg-opacity-[0.65]">
                                                <ZoomInSvg />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-4 right-4">
                                            <div className="flex p-4 px-8 bg-white cursor-pointer rounded-xl">
                                                <label htmlFor='ticket-media-modal'><span className="text-base font-bold">Show all photos({ticket.medias?.length || 0})</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 ml-4">
                                    <p className="text-2xl font-bold">Description</p>
                                </div>
                                <div className="mt-6 ml-4">
                                    {ticket.description}
                                </div>
                                <div className="mt-6 ml-4">
                                    <p className="text-2xl font-bold">Detail</p>
                                </div>
                                <div className="mt-6 ml-4 mr-4">
                                    <div className="border-2 p-6 rounded-xl border-black border-opacity-[0.2] space-y-4">
                                        <div className="flex items-center w-full">
                                            <Clock />
                                            <p className="ml-4 text-sm text-black text-opacity-[0.65]">Event Date Thursday March 30, 2023 21:00:00 (your selected Time Zone)</p>
                                        </div>
                                        <div className="flex items-center w-full">
                                            <LocationSvg />
                                            <p className="ml-4 text-base text-black text-opacity-[0.65]">{'Metaland'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    {/* <SystemRequirementsSection /> */}
                                    <div className="mt-6">
                                        <div className="px-8">
                                            <MediaSection ticket={ticket} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='md:ml-[50px] md:w-[40%] mw-md:order-1'>
                                <div className="flex flex-col w-full">
                                    <div className="rounded-lg border-[1px] border-black border-opacity-[0.1] p-6">
                                        <div>
                                            <p className='text-sm opacity-[0.65]'>Hosted by ARD</p>
                                            <p className='text-2xl font-bold max-w-[250px]'>
                                                {ticket.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border border-black rounded-lg border-opacity-[0.1] p-6 mt-4">
                                        <div className='flex items-center'>
                                            <Clock size={24} />
                                            <p className='text-black text-sm text-opacity-[0.65] ml-1'>Early Bird Sale ends {moment("2023-03-04").utcOffset("+08:00").format("MMMM D, YYYY")}</p>
                                        </div>
                                        <div className="mt-4">
                                            <div className="p-4 rounded-lg bg-black bg-opacity-[0.04]">
                                                <div className="flex flex-col">
                                                    <p className='text-black text-sm text-opacity-[0.65]'>Current price</p>
                                                    <div className="flex items-center text-2xl font-bold">${priceFormatted} <span className="ml-2 text-sm font-[300] text-black text-opacity-[0.65]">ARDX{priceArdx}</span> </div>
                                                </div>
                                            </div>
                                        </div>
                                        {isTimezoneWarningVisible ? (
                                            <div className="mt-4">
                                                <div className="flex w-full p-4 rounded-lg itms-start" style={{ background: 'rgba(255, 140, 0, 0.05)' }}>
                                                    <span className='text-xs'>To make Purchase please select your Time Zone accordingly. Please note that you will be only able to attend the concert in the the Time zone of your selection.</span>
                                                    <span onClick={() => {
                                                        setIsTimezoneWarningVisible(false)
                                                    }} className='ml-2 cursor-pointer'><MdClose size={16} /></span>
                                                </div>
                                            </div>
                                        ) : (<></>)}
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
                                                                    className={classNames(`text-sm border text-left px-8`, { 'btn btn-black border-transparent p-3': selectedTicketId === ticket.id, 'bg-white hover:bg-black hover:bg-opacity-[0.04] p-3 border rounded-lg text-black': selectedTicketId !== ticket.id })}>
                                                                    {ticket.name} {moment(ticket.scheduleDate).format('LLL Z')}
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
                                                    <button onClick={handlePurchase} className={classNames("btn btn-primary rounded-lg btn-block", { 'bg-black bg-opacity-[0.2] text-black text-opacity-[0.2] hover:bg-black hover:bg-opacity-[0.2]': !selectedTicketId })}>Purchase</button>
                                                </div>
                                                <div className="flex ml-2">
                                                    <div className="btn hover:bg-opacity-[0.12] btn-disabled bg-opacity-[0.2] rounded-lg">
                                                        <PlusGrey />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <SystemRequirementsSection />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <GalleryOverlay ticket={ticket} />
        </>
    )
}

export default TicketSection