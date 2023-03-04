import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { showAuthModal } from '@/store/reducer/auth-reducer/actions';
import { useArdxUsdRateQuery, useAssetDetailEarlyQuery, useCreateIdaxInvoiceMutation, useLazyArdxUsdRateQuery, useLazyMonxanshRateQuery, useUsdToArdxRateQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api';
import { ArdArtAssetDetailResult } from '@/store/rtk-query/hux-ard-art/types';
import PlusGrey from '@/components/icon/svgr/PlusGrey'
import LocationSvg from '@/assets/svg/location.svg'
import { MdClose, MdOutlineLocationOn } from 'react-icons/md'

import Clock from '@/components/icon/svgr/Clock'
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useState, useMemo, useEffect } from 'react';

import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { formatPrice } from '@/lib/utils';
import classNames from 'classnames';
import { TICKET_REGIONS } from '@/lib/consts';
import SystemRequirementsSection from '@/components/section/components/SystemRequirementsSection';

type Props = {
    item: ArdArtAssetDetailResult,
}

export default function ProductDetailFeature({
    item,
}: Props) {

    const { data: usdToArdx } = useUsdToArdxRateQuery()
    const [selectedTicketRegion, setSelectedTicketRegion] = useState<string>()
    const [callCreateIdaxInvoice] = useCreateIdaxInvoiceMutation()

    const authSession = useAppSelector(state => state.auth.session)

    const [isTimezoneWarningVisible, setIsTimezoneWarningVisible] = useState(true)

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch()
    const router = useRouter()

    const email = useAppSelector(state => state.auth.profile?.email)
    const accountId = useAppSelector(state => state.auth.ardArt?.accountId)

    const idaxAuth = useAppSelector(state => state.auth.idax)

    const handlePurchase = async () => {
        if (!selectedTicketRegion) {
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
        if (authSession === 'idax-wv') {
            const r = await callCreateIdaxInvoice({
                productId: item.id,
                accountId: accountId,
                email: email!,
                type: 'single',
                amount: 1,
                idaxUserId: `${idaxAuth?.id}`,
                idaxUserCode: idaxAuth?.code as string
            }).unwrap()
            if (r.result) {
                window.location.href = r.result.response.url
            }
        } else {
            router.push(`/payment?productId=${item.id}&region=${selectedTicketRegion}`)
        }
    }

    const priceFormatted = useMemo(() => {
        return formatPrice(item.price)
    }, [item])

    return (
        <div>
            <div className="flex justify-center w-full pb-16 mt-4">
                <div className="container lg:max-w-[70vw] 2xl:max-w-[1024px] mw-md:px-4">
                    <div className="flex flex-col justify-between w-full md:flex-row">
                        <div className="md:w-[60%] mw-md:order-2 mw-md:mt-8">
                            <div className="flex justify-center w-full">
                                <div className="relative flex justify-center w-full">
                                    <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-auto rounded-lg" />
                                </div>
                            </div>
                            <div className="mt-6 ml-4">
                                <p className="text-2xl font-bold">Description</p>
                            </div>
                            <div className="mt-6 ml-4 text-black opacity-[0.65]">
                                {item.description}
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
                                        <p className="ml-4 text-sm text-black text-opacity-[0.65]">{'Metaland'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='md:ml-[50px] md:w-[40%] mw-md:order-1'>
                            <div className="flex flex-col w-full">
                                <div className="rounded-lg border-[1px] border-black border-opacity-[0.1] p-6">
                                    <div>
                                        <p className='text-sm opacity-[0.65]'>Powered by ARD</p>
                                        <p className='text-2xl font-bold max-w-[250px]'>
                                            {item.name}
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
                                                <div className="flex items-center text-2xl font-bold">${priceFormatted} {usdToArdx ? (
                                                    <span className="ml-2 text-sm font-[300] text-black text-opacity-[0.65]">ARDX{formatPrice(item.price * usdToArdx)}</span>
                                                ) : (<ClipLoader size={14} />)}</div>
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
                                                <div className='flex flex-col w-full space-y-4'>
                                                    {TICKET_REGIONS.map((item) => (
                                                        <button key={item.region}
                                                            onClick={() => {
                                                                setSelectedTicketRegion(item.region)
                                                            }}
                                                            className={classNames(`text-sm border text-left`, { 'bg-black text-white p-3 rounded-lg': selectedTicketRegion === item.region, 'bg-white hover:bg-black hover:bg-opacity-[0.04] px-4 py-3 border rounded-lg text-black': selectedTicketRegion !== item.region })}>
                                                            {item.name} {item.date}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex w-full">
                                            <div className="flex flex-grow">
                                                <button onClick={handlePurchase} className={classNames("btn btn-primary rounded-lg btn-block", { 'bg-black bg-opacity-[0.2] text-black text-opacity-[0.2] hover:bg-black hover:bg-opacity-[0.2]': !selectedTicketRegion })}>Purchase</button>
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
    )
}