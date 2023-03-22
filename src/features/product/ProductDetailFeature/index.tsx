import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { showAuthModal } from '@/store/reducer/auth-reducer/actions';
import { useArdxUsdRateQuery, useAssetDetailEarlyQuery, useCreateIdaxInvoiceMutation, useLazyArdxUsdRateQuery, useLazyMonxanshRateQuery, useUsdToArdxRateQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api';
import { ArdArtAssetDetailResult } from '@/store/rtk-query/hux-ard-art/types';
import { MdClose, MdOutlineLocationOn } from 'react-icons/md'
import WarningSvg from './img/warning.svg'

import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

import ExpandSvg from './img/expand.svg'

import { useRouter } from 'next/router';
import React, { useState, useMemo, useEffect } from 'react';
import HeartWhiteSvg from './img/heart-white.svg'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { formatPrice } from '@/lib/utils';
import classNames from 'classnames';
import { TICKET_REGIONS, WV_IDAX_CODE_URL } from '@/lib/consts';

import ModelModal from './components/ModelModal';
import * as idaxWvPersistence from '@/lib/wv/idax/persistence'

type Props = {
    item: ArdArtAssetDetailResult,
}

export default function ProductDetailFeature({
    item,
}: Props) {

    const [isModelExpanded, setIsModelExpanded] = useState(false)
    const { data: usdToArdx } = useUsdToArdxRateQuery()
    const [selectedTicketRegion, setSelectedTicketRegion] = useState<string>()

    const authSession = useAppSelector(state => state.auth.session)

    const [isVideoLoading, setIsVideoLoading] = useState(false)
    const [isTimezoneWarningVisible, setIsTimezoneWarningVisible] = useState(true)

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch()
    const router = useRouter()

    const email = useAppSelector(state => state.auth.profile?.email)
    const accountId = useAppSelector(state => state.auth.ardArt?.accountId)

    const idaxAuth = useAppSelector(state => state.auth.idax)

    const [isDescSeeMore, setIsDescSeeMore] = useState(false)

    const isVideo = useMemo(() => {
        return item?.coverUrl?.endsWith('.mp4')
    }, [item.coverUrl])

    const isGlb = useMemo(() => {
        return item?.coverUrl?.replace('\n', '')?.endsWith('.glb')
    }, [item.coverUrl])

    const handlePurchase = async () => {
        if (!selectedTicketRegion && item.type === 'ticket') {
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
            idaxWvPersistence.storeProduct({
                productId: item.id,
                region: selectedTicketRegion
            })
            if (WV_IDAX_CODE_URL) {
                window.location.href = WV_IDAX_CODE_URL
            }
        } else {
            router.push(`/payment?productId=${item.id}${selectedTicketRegion ? `&region=${selectedTicketRegion}` : ''}`)
        }
    }

    return (
        <>
            <div>
                <div className="flex justify-center w-full pb-16 mt-4">
                    <div className="container lg:max-w-[70vw] 2xl:max-w-[1024px] mw-md:px-4">
                        <div className="flex flex-col justify-between w-full md:flex-row">
                            <div className="md:w-[60%] relative mw-md:mt-8">
                                <div className="flex justify-center w-full">
                                    <div className="relative flex justify-center w-full">
                                        {isVideoLoading ? (
                                            <div className='absolute top-4 right-4'><ClipLoader /></div>
                                        ) : (<></>)}
                                        {isVideo ? (<video onLoadStart={() => {
                                            setIsVideoLoading(true)
                                        }} onLoadedData={() => {
                                            setIsVideoLoading(false)
                                        }} src={item.coverUrl} autoPlay loop muted poster={item.imageUrl} className="object-cover w-full h-auto rounded-lg" />) : (<></>)}
                                        {isGlb ? (
                                            <div className="relative flex items-center justify-center w-full h-auto aspect-square">
                                                <div dangerouslySetInnerHTML={{
                                                    __html: `<model-viewer loading="eager" class="hu-product-model-viewer" powerPreference="low-power" poster="${item.imageUrl}" src="${item.coverUrl}" autoplay ar crossorigin="anonymous" camera-controls touch-action="pan-y"></model-viewer>`
                                                }}>

                                                </div>

                                            </div>
                                        ) : (<></>)}
                                        {!isVideo && !isGlb ? (
                                            <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-auto rounded-lg" />
                                        ) : (<></>)}
                                    </div>
                                </div>
                                {isGlb ? (
                                    <div onClick={() => {
                                        setIsModelExpanded(true)
                                    }} className="absolute bg-black bg-opacity-[0.04] rounded-xl p-4 cursor-pointer top-4 right-4">
                                        <ExpandSvg />
                                    </div>
                                ) : (<></>)}
                                <div className="flex mt-0 md:hidden">
                                    <div className='flex flex-col'>
                                        <p className='text-[24px] md:text-2xl mt-4 font-bold max-w-[250px]'>
                                            {item.name} {item.category?.length ? (<span className="capitalize opacity-[0.35]">({item.category})</span>) : (<></>)}
                                        </p>
                                        <p className='text-sm md:text-base'><span className='opacity-[0.65]'>Powered by</span> <span className="font-bold  text-black opacity-[0.93]">Ard</span> & <span className="font-bold  text-black opacity-[0.93]">Metaland</span></p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full">
                                    <div className="mt-4">
                                        <p className="text-base font-bold md:text-xl">Detail</p>
                                    </div>
                                    <div className={classNames("mt-2 overflow-y-hidden text-black md:text-base text-sm opacity-[0.65]", {
                                        'max-h-[100px]': !isDescSeeMore
                                    })}>
                                        <p>{item.description}</p>
                                        {item.about ? (
                                            <>
                                                <p className='mt-2'>About the Artwork</p>
                                                <p>{item.about}</p>
                                            </>
                                        ) : (<></>)}
                                    </div>
                                    <div onClick={() => setIsDescSeeMore(!isDescSeeMore)} className="flex items-center mt-2 cursor-pointer">
                                        <span className='text-sm'>See more</span>
                                        {isDescSeeMore ? <BiChevronUp className='ml-3' size={20} /> : <BiChevronDown className='ml-3' size={20} />}
                                    </div>
                                </div>
                                <div className='hidden mt-8 md:block'>
                                    <div className="grid grid-cols-3 space-x-2">
                                        <div className="flex items-center ml-2 md:ml-0 bg-black bg-opacity-[0.04] rounded-xl px-4 py-2">
                                            <div className="flex flex-col">
                                                <div className="flex">
                                                    <span className="text-sm font-bold md:text-base">$ {formatPrice(item.price)}</span>
                                                    {usdToArdx ? (
                                                        <span className='text-xs font-normal ml-1 text-opacity-[0.65] text-black'>ARDX {formatPrice(item.price * usdToArdx)}</span>
                                                    ) : (<ClipLoader size={14} />)}
                                                </div>
                                                <span className="text-[10px] text-black text-opacity-[0.65]">
                                                    total bundle price with USD
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center md:ml-2 bg-black bg-opacity-[0.04] rounded-xl px-4 py-2">
                                            <div className="flex flex-col">
                                                <div className="flex">
                                                    <span className="text-sm font-bold md:text-base">March 30, 2023</span>
                                                </div>
                                                <span className="text-[10px] text-black text-opacity-[0.65]">
                                                    Event Date
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center ml-2 mt-2 md:mt-0 md:ml-2 bg-black bg-opacity-[0.04] rounded-xl px-4 py-2">
                                            <div className="flex flex-col">
                                                <div className="flex">
                                                    <span className="text-sm font-bold md:text-base">Metaland</span>
                                                </div>
                                                <span className="text-[10px] text-black text-opacity-[0.65]">
                                                    Location
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 md:hidden">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex items-center bg-black bg-opacity-[0.04] rounded-xl px-4 py-2">
                                            <div className="flex flex-col">
                                                <div className="flex">
                                                    <span className="text-sm font-bold md:text-base">$ {formatPrice(item.price)}</span>
                                                    {usdToArdx ? (
                                                        <span className='text-xs font-normal ml-1 text-opacity-[0.65] text-black'>ARDX {formatPrice(item.price * usdToArdx)}</span>
                                                    ) : (<ClipLoader size={14} />)}
                                                </div>
                                                <span className="text-[10px] text-black text-opacity-[0.65]">
                                                    total bundle price with USD
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex h-full items-center md:mt-0 md:ml-2 bg-black bg-opacity-[0.04] rounded-xl px-4 py-2">
                                            <div className="flex flex-col">
                                                <div className="flex">
                                                    <span className="text-sm font-bold md:text-base">March 30, 2023</span>
                                                </div>
                                                <span className="text-[10px] text-black text-opacity-[0.65]">
                                                    Event Date
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center md:mt-0 md:ml-2 bg-black bg-opacity-[0.04] rounded-xl px-4 py-2">
                                            <div className="flex flex-col">
                                                <div className="flex">
                                                    <span className="text-sm font-bold md:text-base">Metaland</span>
                                                </div>
                                                <span className="text-[10px] text-black text-opacity-[0.65]">
                                                    Location
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='md:ml-[50px] md:w-[40%]'>
                                <div className="flex flex-col w-full">
                                    <div className="hidden rounded-lg md:block">
                                        <div>
                                            <p className='text-sm md:text-base'><span className='opacity-[0.65]'>Powered by</span> <span className="font-bold  text-black opacity-[0.93]">Ard</span> & <span className="font-bold  text-black opacity-[0.93]">Metaland</span></p>
                                            <p className='text-[24px] md:text-2xl mt-4 font-bold max-w-[250px]'>
                                                {item.name} {item.category?.length ? (<span className="capitalize opacity-[0.35]">({item.category})</span>) : (<></>)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        {item.type === 'ticket' ? (
                                            <div className="mt-4">
                                                <div className='flex items-center'>
                                                    <MdOutlineLocationOn size={24} opacity={0.65} />
                                                    <p className='text-black text-sm text-opacity-[0.65] ml-1'>Choose timezone that matches you</p>
                                                </div>
                                                <div className="mt-4">
                                                    <div className="flex w-full p-4 rounded-xl itms-start" style={{ background: 'rgba(255, 140, 0, 0.05)' }}>
                                                        <div><WarningSvg /></div>
                                                        <span className='text-xs ml-[18px]'>To make Purchase please select your Time Zone accordingly. Please note that you will be only able to attend the concert in the the Time zone of your selection.</span>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <div className="flex flex-col w-full">
                                                        <div className='flex flex-col w-full space-y-4'>
                                                            {TICKET_REGIONS.map((item) => (
                                                                <button key={item.region}
                                                                    onClick={() => {
                                                                        setSelectedTicketRegion(item.region)
                                                                    }}
                                                                    className={classNames(`text-xs md:text-sm border text-left`, {
                                                                        'bg-black text-white p-3 rounded-lg': selectedTicketRegion === item.region,
                                                                        'bg-white text-opacity-[0.65] hover:bg-black hover:bg-opacity-[0.04] px-4 py-3 border rounded-lg text-black': selectedTicketRegion !== item.region
                                                                    })}>
                                                                    {item.date}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (<></>)}
                                        <div>
                                            {item.type !== 'ticket' ? (
                                                <div>
                                                    <div className="flex w-full p-4 rounded-xl itms-start" style={{ background: 'rgba(255, 140, 0, 0.05)' }}>
                                                        <div><WarningSvg /></div>
                                                        <span className='text-xs ml-[18px]'>Single items do not include tickets.</span>
                                                    </div>
                                                </div>) : <></>}
                                            <div className="flex w-full mt-4">
                                                <div className="flex flex-grow">
                                                    <button onClick={handlePurchase} className={classNames("btn btn-primary rounded-lg btn-block ", { 'bg-black bg-opacity-[0.2] text-black text-opacity-[0.2] hover:bg-black hover:bg-opacity-[0.2]': !selectedTicketRegion && item.type === 'ticket' })}>Purchase $({formatPrice(item.price)})</button>
                                                </div>
                                                <div className="flex ml-2">
                                                    <div className="btn bg-black bg-opacity-[0.2] btn-disabled rounded-lg">
                                                        <HeartWhiteSvg />
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
            {isGlb ? (
                <ModelModal modelUrl={item.coverUrl} imageUrl={item.imageUrl} isOpen={isModelExpanded} onClose={() => setIsModelExpanded(false)} />
            ) : (<></>)}
        </>
    )
}