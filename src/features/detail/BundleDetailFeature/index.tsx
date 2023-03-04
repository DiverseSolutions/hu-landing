import FilterTag from '@/components/btn/FilterTag'
import BundleItemCard from '@/components/card/BundleItemCard'
import { formatPrice } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { showAuthModal } from '@/store/reducer/auth-reducer/actions'
import { useCreateIdaxInvoiceMutation, useUsdToArdxRateQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { ArdArtBundleDetailResult } from '@/store/rtk-query/hux-ard-art/types'
import { useRouter } from 'next/router'
import PlusGrey from '@/components/icon/svgr/PlusGrey'
import React, { useState, useMemo } from 'react'
import { toast } from 'react-toastify'
import { MdClose, MdOutlineLocationOn } from 'react-icons/md'

import { TICKET_REGIONS } from '@/lib/consts'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { ClipLoader } from 'react-spinners'
import SystemRequirementsSection from '@/components/section/components/SystemRequirementsSection'
import SystemRequirementsDropdown from '@/components/common/SystemRequirementsDropdown'
import { IoExpand, IoResize } from 'react-icons/io5'
import ModelModal from './components/ModelModal'

type Props = {
    bundle: ArdArtBundleDetailResult
}

const ModelViewer = `model-viewer` as keyof JSX.IntrinsicElements

const TAGS = ['Legendary', 'Epic', 'Rare', 'Common']

function BundleDetailFeature({
    bundle
}: Props) {

    const [isModelExpanded, setIsModelExpanded] = useState(false)
    const router = useRouter()
    const [selectedRegion, setSelectedRegion] = useState<string>()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const accountId = useAppSelector(state => state.auth.ardArt?.accountId)
    const authSession = useAppSelector(state => state.auth.session)
    const email = useAppSelector(state => state.auth.profile?.email)
    const idaxAuth = useAppSelector(state => state.auth.idax)
    const dispatch = useAppDispatch()

    const { data: usdArdx } = useUsdToArdxRateQuery()

    const [callCreateIdaxInvoice] = useCreateIdaxInvoiceMutation()

    const isGlb = useMemo(() => {
        return bundle.coverUrl.endsWith('.glb')
    }, [bundle.coverUrl])

    const handlePurchase = async () => {
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
            router.push(`/payment?bundleId=${bundle.id}&region=${selectedRegion}`)
        }
    }

    return (
        <>
            <div>
                {isGlb ? (
                    <div className="flex relative justify-center w-full h-[400px]">
                        <div dangerouslySetInnerHTML={{
                            __html: `<model-viewer loading="eager" style="height: 400px; width: 50vw;" poster="${bundle.imageUrl}" src="${bundle.coverUrl}" ar crossorigin="anonymous" camera-controls touch-action="pan-y"></model-viewer>`
                        }}>

                        </div>
                        <div onClick={() => {
                            setIsModelExpanded(true)
                        }} className="absolute cursor-pointer top-0 right-[35%]">
                            <IoExpand size={48} />
                        </div>
                    </div>
                ) : (<img src={bundle.coverUrl} className="object-cover rounded-xl w-full h-[400px]" />)}
                <div className="flex justify-center w-full">
                    <div className="container mt-8">
                        <div className="flex w-full">
                            <div className="flex flex-col w-[65%]">
                                <p className="font-bold text-[32px]">{bundle.name}</p>
                                <div className="mt-6">
                                    <div className="flex items-center">
                                        <p className='text-base'>Powered by <span className="font-bold">ARD</span></p>
                                        <p className='ml-8 text-base'>Created <span className='font-bold'>Feb 2023</span></p>
                                    </div>
                                    <div className="mt-6">
                                        <p className='text-black text-opacity-[0.54] text-base'>{bundle.description}</p>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flex"><SystemRequirementsDropdown /></div>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flex">
                                            <div className="flex bg-black bg-opacity-[0.04] rounded-lg">
                                                <div className="flex flex-col items-center px-4 py-2">
                                                    <p className='text-2xl font-bold'>{bundle.items?.length}</p>
                                                    <p className="font-normal text-black text-opacity-[0.65]">Items</p>
                                                </div>
                                            </div>
                                            <div className="flex ml-2 bg-black bg-opacity-[0.04] rounded-lg px-4 py-2 pr-[120px]">
                                                <div className="flex flex-col">
                                                    <div className="flex">
                                                        <span className="text-2xl font-bold">$ {formatPrice(bundle.price)}</span>
                                                        {usdArdx ? (
                                                            <span className='text-sm font-normal ml-1 text-opacity-[0.65] text-black'>ARDX {formatPrice(bundle.price * usdArdx)}</span>
                                                        ) : (<ClipLoader size={14} />)}
                                                    </div>
                                                    <span className="mt-1 text-sm text-black text-opacity-[0.65]">
                                                        total bundle price with USD
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[35%] ml-10">
                                <div className="mt-4 rounded-lg border-[1px] border-black border-opacity-[0.1] p-6">
                                    <div className='flex items-center'>
                                        <MdOutlineLocationOn size={24} opacity={0.65} />
                                        <p className='text-black text-sm text-opacity-[0.65] ml-1'>Choose timezone that matches you</p>
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex w-full p-4 rounded-lg itms-start" style={{ background: 'rgba(255, 140, 0, 0.05)' }}>
                                            <span className='text-xs'>To make Purchase please select your Time Zone accordingly. Please note that you will be only able to attend the concert in the the Time zone of your selection.</span>
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
                                                        className={classNames(`text-sm border text-left`, { 'bg-black text-white p-3 rounded-lg': selectedRegion === ticket.region, 'bg-white hover:bg-black hover:bg-opacity-[0.04] px-4 py-3 border rounded-lg text-black': selectedRegion !== ticket.region })}>
                                                        {ticket.name} {ticket.date}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex w-full">
                                            <div className="flex flex-grow">
                                                <button onClick={handlePurchase} className={classNames("btn btn-primary rounded-lg btn-block", { 'bg-black bg-opacity-[0.2] text-black text-opacity-[0.2] hover:bg-black hover:bg-opacity-[0.2]': !selectedRegion })}>Purchase</button>
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
                <div className="flex justify-center w-full mt-[120px]">
                    <div className="container">
                        <div className="flex space-x-2">
                            {TAGS.map((tag) => <FilterTag key={tag} name={tag} />)}
                        </div>
                        <div className="mt-6">
                            {bundle.items?.length ? (
                                <div className="grid grid-cols-1 gap-x-2 md:grid-cols-2 xl:grid-cols-5">
                                    {bundle.items.map((item) => (
                                        <BundleItemCard key={item.id} item={item} />
                                    ))}
                                </div>
                            ) : (<div className='w-full'>Bundle has no items.</div>)}
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