import BundleItemCard from '@/components/card/BundleItemCard'
import { formatPrice } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { showAuthModal } from '@/store/reducer/auth-reducer/actions'
import { useCreateIdaxInvoiceMutation, useUsdToArdxRateQuery, useUseCouponMutation } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { ArdArtBundleDetailResult, ArdArtCheckCouponResult } from '@/store/rtk-query/hux-ard-art/types'
import { useRouter } from 'next/router'
import ExpandSvg from './img/expand.svg'
import React, { useState, useMemo } from 'react'
import { toast } from 'react-toastify'
import HeartWhiteSvg from './img/heart-white.svg'
import { MdClose, MdOutlineLocationOn } from 'react-icons/md'

import WarningSvg from './img/warning.svg'

import { TICKET_REGIONS } from '@/lib/consts'
import classNames from 'classnames'
import { ClipLoader } from 'react-spinners'
import ModelModal from './components/ModelModal'
import { CategoryItemType } from '@/components/common/CategorySelectList/types'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

type Props = {
    bundle: ArdArtBundleDetailResult,
    coupon?: {
        coupon: ArdArtCheckCouponResult,
        code: string
    } | undefined,
}

function BundleDetailFeature({
    bundle,
    coupon
}: Props) {

    const [couponCode, setCouponCode] = useState<string>()
    const [isDescSeeMore, setIsDescSeeMore] = useState(false)
    const [activeCategory, setActiveCategory] = useState<CategoryItemType[]>([])
    const [isModelExpanded, setIsModelExpanded] = useState(false)
    const router = useRouter()
    const [selectedRegion, setSelectedRegion] = useState<string>()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const accountId = useAppSelector(state => state.auth.ardArt?.accountId)
    const authSession = useAppSelector(state => state.auth.session)
    const email = useAppSelector(state => state.auth.profile?.email)
    const idaxAuth = useAppSelector(state => state.auth.idax)
    const dispatch = useAppDispatch()

    const [callUseCoupon, { isLoading: isUseCouponLoading }] = useUseCouponMutation()

    const { data: usdArdx } = useUsdToArdxRateQuery()

    const [callCreateIdaxInvoice] = useCreateIdaxInvoiceMutation()

    const isGlb = useMemo(() => {
        return bundle.coverUrl?.endsWith('.glb')
    }, [bundle.coverUrl])

    const visibleItems = useMemo(() => {
        if (!activeCategory?.length) {
            return bundle.items
        }
        return bundle.items.filter((i) => activeCategory.find((a) => a.id === i.product.category || a.id === i.product.tag || a.id === i.product.category))
    }, [bundle.items, activeCategory])

    const handlePurchase = async () => {
        if (!selectedRegion) {
            toast('Please select your ticket timezone', {
                type: 'warning'
            })
            return
        }
        if (authSession === 'idax-wv') {
            const r = await callCreateIdaxInvoice({
                productId: bundle.id,
                accountId: accountId,
                email: email! || "test@gmail.com",
                type: 'bundle',
                amount: 1,
                idaxUserId: `${idaxAuth?.id}`,
                idaxUserCode: idaxAuth?.code as string
            }).unwrap()
            if (r.result) {
                window.location.href = r.result.response.url
            }
        } else {
            if (!isLoggedIn || !accountId) {
                dispatch(showAuthModal({
                    type: 'login'
                }))
                return;
            }
            router.push(`/payment?bundleId=${bundle.id}&region=${selectedRegion}`)
        }
    }

    const handleCoupon = async () => {
        if (!selectedRegion) {
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
        if (coupon) {
            const r = await callUseCoupon({
                code: coupon.code,
                bundleId: bundle.id,
                region: selectedRegion,
                accountId,
                email: email!
            }).unwrap()
        }
    }

    return (
        <>
            <div>

                <div className="flex justify-center w-full">
                    <div className="container px-4 mt-8 md:px-0">
                        <div className="flex flex-col w-full md:flex-row">
                            <div className="flex w-full">
                                {isGlb ? (
                                    <div className="relative flex items-center justify-center w-full h-full border mw-md:aspect-square rounded-xl">
                                        <div dangerouslySetInnerHTML={{
                                            __html: `<model-viewer autoplay loading="eager" class="hu-model-viewer" poster="${bundle.imageUrl}" src="${bundle.coverUrl}" ar crossorigin="anonymous" camera-controls touch-action="pan-y"></model-viewer>`
                                        }}>

                                        </div>
                                        <div onClick={() => {
                                            setIsModelExpanded(true)
                                        }} className="absolute bg-black bg-opacity-[0.04] rounded-xl p-4 cursor-pointer top-4 right-4">
                                            <ExpandSvg />
                                        </div>
                                    </div>
                                ) : (<img src={bundle.imageUrl} className="object-cover w-full h-auto rounded-xl" />)}
                            </div>
                            <div className="flex flex-col w-full mt-4 md:ml-4">
                                <div className='flex flex-col justify-between w-full h-full'>
                                    <div className="flex flex-col">
                                        <p className="font-bold text-[24px] leading-[32px] max-w-[300px]">{bundle.name} <span className="text-black text-opacity-[0.35]">(Bundle)</span></p>
                                        <div className="flex items-center mt-4">
                                            <p className='text-sm md:text-base'>Powered by <span className="font-bold">Ard</span></p>
                                            <span className="px-2 py-1 font-bold ml-2 text-xs text-white rounded-xl bg-[#D63333]">Bonus ARDX{formatPrice(bundle.depositAmount)}</span>
                                            <div className="rounded-full w-0.5 h-0.5 bg-black ml-2">

                                            </div>
                                            <p className='ml-2 text-sm md:text-base'>Created <span className='font-bold'>Feb 2023</span></p>
                                        </div>
                                        <div className={classNames("mt-6 overflow-y-auto no-scrollbar", {
                                            'overflow-hidden max-h-[300px]': isDescSeeMore,
                                            'overflow-y-auto max-h-[100px]': !isDescSeeMore
                                        })}>
                                            <p className={'text-black text-opacity-[0.54] text-sm md:text-base'}>{bundle.description}</p>
                                            {bundle.about ? (
                                                <div>
                                                    <p className='text-black text-opacity-[0.54] text-sm md:text-base mt-2'>About the Artwork</p>
                                                    <p className='text-black text-opacity-[0.54] text-sm md:text-base'>{bundle.about}</p>
                                                </div>
                                            ) : <></>}
                                        </div>
                                        <div onClick={() => setIsDescSeeMore(!isDescSeeMore)} className="flex items-center mt-2 cursor-pointer">
                                            <span className='text-sm'>See more</span>
                                            {isDescSeeMore ? <BiChevronUp className='ml-3' size={20} /> : <BiChevronDown className='ml-3' size={20} />}
                                        </div>
                                    </div>
                                    <div className="flex w-full mt-8">
                                        <div className="flex flex-wrap md:flex-nowrap">
                                            <div className="flex bg-black bg-opacity-[0.04] rounded-xl">
                                                <div className="flex flex-col items-center justify-center px-4 py-2">
                                                    <p className='text-sm font-bold md:text-base'>{bundle.items?.length}</p>
                                                    <p className="font-normal text-[10px] text-black text-opacity-[0.65]">Items</p>
                                                </div>
                                            </div>
                                            <div className="flex ml-2 bg-black bg-opacity-[0.04] rounded-xl px-4 py-2">
                                                <div className="flex flex-col">
                                                    <div className="flex">
                                                        <span className="text-sm font-bold md:text-base">$ {formatPrice(bundle.price)}</span>
                                                        {usdArdx ? (
                                                            <span className='text-xs font-normal ml-1 text-opacity-[0.65] text-black'>ARDX {formatPrice(bundle.price * usdArdx)}</span>
                                                        ) : (<ClipLoader size={14} />)}
                                                    </div>
                                                    <span className="text-[10px] text-black text-opacity-[0.65]">
                                                        total bundle price with USD
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-full md:hidden"></div>
                                            <div className="flex mt-2 md:mt-0 md:ml-2 bg-black bg-opacity-[0.04] rounded-xl px-4 py-2">
                                                <div className="flex flex-col">
                                                    <div className="flex">
                                                        <span className="text-sm font-bold md:text-base">March 30, 2023</span>
                                                    </div>
                                                    <span className="text-[10px] text-black text-opacity-[0.65]">
                                                        Event Date
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex ml-2 mt-2 md:mt-0 md:ml-2 bg-black bg-opacity-[0.04] rounded-xl px-4 py-2">
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
                            </div>
                            <div className="w-full md:ml-20">
                                <div className="mt-4 rounded-xl">
                                    <div className='flex items-center'>
                                        <MdOutlineLocationOn size={24} opacity={0.65} />
                                        <p className='text-black text-xs md:text-sm text-opacity-[0.65] ml-1'>Choose timezone that matches you</p>
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
                                                {TICKET_REGIONS.map((ticket) => (
                                                    <button key={ticket.region}
                                                        onClick={() => {
                                                            setSelectedRegion(ticket.region)
                                                        }}
                                                        className={classNames(`text-xs md:text-sm border text-left`,
                                                            {
                                                                'bg-black text-white p-3 rounded-xl': selectedRegion === ticket.region,
                                                                'bg-white hover:bg-black hover:bg-opacity-[0.04] px-4 py-3 border rounded-xl text-black text-opacity-[0.65]': selectedRegion !== ticket.region,
                                                            })}>
                                                        {ticket.date}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex w-full">
                                            <div className="flex flex-grow">
                                                {coupon ?
                                                    (<button onClick={handleCoupon} className={classNames("btn btn-primary rounded-xl btn-block", { 'bg-black bg-opacity-[0.2] text-black text-opacity-[0.2] hover:bg-black hover:bg-opacity-[0.2]': !selectedRegion })}>{coupon ? 'Purchase Using Coupon Code' : `Purchase (${formatPrice(bundle.price)})`}</button>) : (
                                                        <button onClick={handlePurchase} className={classNames("btn btn-primary rounded-xl btn-block", { 'bg-black bg-opacity-[0.2] text-black text-opacity-[0.2] hover:bg-black hover:bg-opacity-[0.2]': !selectedRegion })}>{`Purchase (${formatPrice(bundle.price)})`}</button>
                                                    )}
                                            </div>
                                            <div className="flex ml-2">
                                                <div className="btn bg-opacity-[0.2] bg-black btn-disabled rounded-xl">
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
                <div className="border-b mt-10 w-full bg-black bg-opacity-[0.1]"></div>
                <div className="flex justify-center w-full mt-4 md:mt-8">
                    <div className="container px-4 md:px-0">
                        <p className="font-bold text-xl md:text-[32px]">Included items</p>
                        <div className="mt-6 md:mt-8">
                            {visibleItems?.length ? (
                                <div className="grid grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-2 xl:grid-cols-5">
                                    {visibleItems.map((item) => (
                                        <BundleItemCard key={item.id} item={item} />
                                    ))}
                                </div>
                            ) : (<></>)}
                        </div>
                    </div>
                </div>
            </div>
            {isGlb ? (
                <ModelModal modelUrl={bundle.coverUrl} imageUrl={bundle.imageUrl} isOpen={isModelExpanded} onClose={() => setIsModelExpanded(false)} />
            ) : (<></>)}
        </>
    )
}

export default BundleDetailFeature