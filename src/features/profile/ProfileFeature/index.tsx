import MyNftCard from '@/components/card/MyNftCard'
import { times as _times } from 'lodash'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { showAuthModal } from '@/store/reducer/auth-reducer/actions'
import { useLazyMyOwnedNftQuery, useMyNftCountQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { BiHide } from 'react-icons/bi'
import React, { useEffect, useState, useMemo } from 'react'
import { ClipLoader } from 'react-spinners'
import Avatar from '@/components/avatar/Avatar'
import PageLoader from '@/components/loader/PageLoader'
import classNames from 'classnames'
import Link from 'next/link'
import { useArdxBalanceQuery } from '@/store/rtk-query/ard-art/ard-art-api'
import InfoGreySvg from './img/info-grey.svg'
import SystemRequirementsContent from '@/components/common/SystemRequirementsContent'
import { toast } from 'react-toastify'
import { ASSET_CATEGORY, BUNDLE_CATEGORY } from '@/lib/consts'
import { CategoryItemType } from '@/components/common/CategorySelectList/types'
import CategorySelectList from '@/components/common/CategorySelectList'
import { ArdArtMyOwnedNftRecord } from '@/store/rtk-query/hux-ard-art/types'
import SendNftModal from '@/components/modals/SendNftModal'

type Props = {

}

const categoryList = BUNDLE_CATEGORY.map((b) => ({
    id: b.slug,
    name: b.name
}))

const tagList = ASSET_CATEGORY.map((b) => ({
    id: b.slug,
    name: b.name
}))

const ProfileFeature = ({ }: Props) => {

    const [activeCategory, setActiveCategory] = useState<CategoryItemType[]>([])
    const [activeTag, setActiveTag] = useState<CategoryItemType[]>([])
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isLoginLoading = useAppSelector(state => state.auth.isLoading)
    const accountId = useAppSelector(state => state.auth.ardArt.accountId)
    const profile = useAppSelector(state => state.auth.profile)
    const dispatch = useAppDispatch()

    const { data: myNftCountData, isFetching: isMyNftCountFetching } = useMyNftCountQuery({
        accountId: accountId as number,
    }, {
        skip: !accountId,
        refetchOnMountOrArgChange: true,
    })

    const [callMyOwnedNft, { data: myNftData, isLoading: isMyNftLoading, isFetching: isMyNftFetching }] = useLazyMyOwnedNftQuery()

    useEffect(() => {
        if (isLoggedIn && accountId) {
            callMyOwnedNft({
                ownerId: accountId
            })
        }
    }, [isLoggedIn, accountId])

    const [selectedNftId, setSelectedNftId] = useState<number>()
    const [selectedNftIdIdx, setSelectedNftIdIdx] = useState<string>()
    const [selectedSendNft, setSelectedSendNft] = useState<ArdArtMyOwnedNftRecord>()

    useEffect(() => {
        if (!isLoggedIn && !isLoginLoading) {
            dispatch(showAuthModal({
                type: 'login'
            }))
        }
    }, [isLoggedIn, isLoginLoading])

    const visibleNfts = useMemo(() => {
        if ((activeCategory?.length || activeTag?.length) && myNftData?.result?.records?.length) {
            const visible: ArdArtMyOwnedNftRecord[] = []
            myNftData.result.records.forEach((n) => {
                console.log(n)
                const isInCategory = activeCategory.find((c) => c.id === n.category || c.id === n.tag) ? true : false
                if (isInCategory) {
                    visible.push(n)
                } else {
                    const isInTag = activeTag.find((t) => t.id === n.tag || t.id === n.category) ? true : false
                    if (isInTag) {
                        visible.push(n)
                    }
                }
            })
            return visible
        }
        return myNftData?.result?.records || []
    }, [myNftData, activeCategory, activeTag])

    const { data: ardxBalance, isLoading: isBalanceLoading } = useArdxBalanceQuery()

    const handleSendNft = () => {
        if (!selectedNftId) {
            toast(`Please select your NFTs to send`, { type: 'warning' })
            return
        }
        const nft = myNftData?.result?.records?.find((r) => r.id === selectedNftId)
        if (nft) {
            setSelectedSendNft(nft)
            document.getElementById('send-nft-modal')?.click()
        } else {
            toast(`Nft not found with id: ${selectedNftId}`, {
                type: 'error'
            })
        }
    }

    if (isLoginLoading) {
        return <PageLoader />
    }

    if (!isLoggedIn && !isLoginLoading) {
        return (
            <div className="flex items-center justify-center w-full min-h-[600px]">
                <p onClick={() => dispatch(showAuthModal({
                    type: 'login'
                }))} className="text-xl font-medium">Please sign in to continue.</p>
            </div>
        )
    }

    return (
        <>
            <div className="relative w-full overflow-x-hidden">
                <div className="w-full px-5 pb-16 transform md:px-0">
                    <div className="flex justify-center w-full">
                        <div className="container">
                            <div className="flex flex-col items-center justify-center w-full md:justify-between md:flex-row">
                                <div className='flex'>
                                    <div className="flex justify-center w-full md:justify-start">
                                        <div className="flex items-end h-full">
                                            <div className="flex">
                                                <div className="flex flex-col items-center">
                                                    <p className="text-[32px] leading-[36px] max-w-[100%] font-bold">{profile.username}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex flex-col items-center justify-between w-full md:flex-row">
                                        <div className="grid h-full grid-cols-2 md:flex md:flex-row">
                                            <Link href="/early" rel="noreferrer" className="rounded-xl m-4 text-base cursor-pointer font-bold px-5 py-[14px] bg-white border-black border-opacity-[0.2] border">
                                                <span>Buy More</span>
                                            </Link>
                                            <div onClick={handleSendNft} className={classNames("rounded-xl m-4 cursor-pointer bg-white text-base font-bold px-5 py-[14px] border-opacity-[0.2] border-black border bg-opacity-[0.04]")}>
                                                <span>Send NFT</span>
                                            </div>
                                            <div className="rounded-xl m-4 cursor-pointer font-bold px-5 py-[14px] bg-white border-black border-opacity-[0.2] border">
                                                <div className="flex items-center space-x-4 text-base">
                                                    <span>Hide Profile</span>
                                                    <BiHide size={24} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center h-full mt-4 text-sm md:mt-0">
                                            <div className="px-5 py-[14px] border rounded-xl">
                                                <div className="grid grid-cols-2 gap-x-8">
                                                    <div className="flexopacity-[0.65] justify-between w-full">
                                                        <span>Total NFTs</span>
                                                        <span className='ml-8'>
                                                            {isMyNftCountFetching ? <ClipLoader size={14} /> : myNftCountData?.result?.nftCount || 0}
                                                        </span>
                                                    </div>
                                                    <div className="fle opacity-[0.65] justify-between w-full">
                                                        <span>Sent</span>
                                                        <span className='ml-8'>0</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-5 mt-4 w-full md:w-auto md:mt-0 text-sm h-full py-[14px] md:ml-8 border rounded-xl">
                                            <div className="flex items-center h-full">
                                                <span className="flex text-black text-opacity-[0.65]">Balance</span>
                                                {isBalanceLoading ? (<ClipLoader className='ml-16' size={14} />) : (<span className='ml-16 text-black text-opacity-[0.65] text-sm'>ARDX{ardxBalance?.amount || 0}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className="p-8 rounded-xl w-ful bg-[#3e3bde] bg-opacity-[0.08]">
                                    <div className="flex flex-col justify-between w-full space-y-4 md:space-y-0 md:flex-row">
                                        <div className="flex flex-col max-w-[450px]">
                                            <p className="text-lg font-bold">The Hu in the Metaverse</p>
                                            <p className='text-base mt-4 text-black opacity-[0.65]'>Be a part of history and join the legendary band HU for their first-ever virtual concert in the Metaverse!</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className='md:w-[450px] py-[14px] bg-black rounded-xl font-bold text-white text-center cursor-pointer dropdown dropdown-top dropdown-hover' tabIndex={0}>
                                                Download
                                            </div>
                                            <div tabIndex={0} className="mt-4 z-50 dropdown dropdown-hover dropdown-bottom cursor-pointer items-center flex w-full justify-center py-[14px] bg-white bg-opacity-[0.4] backdrop-blur-[7.5px] rounded-xl">
                                                <InfoGreySvg />
                                                <span className="ml-2  text-black text-opacity-[0.65] text-[20px] font-bold">System Requirements</span>
                                                <div tabIndex={0} className="dropdown-content">
                                                    <div className="mt-2 bg-white rounded-xl">
                                                        <SystemRequirementsContent />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-16">
                                <div>
                                    <div>
                                        <div className="tabs border-b-[1px] border-black border-opacity-[0.2]">
                                            <a className="text-base tab tab-bordered border-black border-b-[1px] tab-active">My Assets</a>
                                            <a className="text-base cursor-not-allowed border-b-[1px] tab tab-bordered border-transparent">Activity</a>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <div className="flex items-center">
                                            <CategorySelectList defaultValues={tagList} onChanged={(v) => setActiveTag(v)} activeValues={activeTag} />
                                            <div className="h-[42px] w-[1px] mx-4 bg-black opacity-[0.2]">

                                            </div>
                                            <CategorySelectList defaultValues={categoryList} onChanged={(v) => setActiveCategory(v)} activeValues={activeCategory} />
                                        </div>
                                    </div>
                                    <div className="flex w-full">
                                        {isMyNftFetching ? (
                                            <div className='w-full flex justify-center items-center min-h-[400px]'>
                                                <ClipLoader />
                                            </div>
                                        ) : (<></>)}
                                        {!isMyNftFetching ? (
                                            <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:-ml-4">
                                                {visibleNfts.map((nft) => (
                                                    <div key={nft.id} className="cursor-pointer">
                                                        {_times(nft.ownerAmount, (num) => {
                                                            const nftIdWithIndex = `${nft.id}_${num}`
                                                            const isSelected = selectedNftIdIdx === nftIdWithIndex
                                                            return (
                                                                <div key={nftIdWithIndex} onClick={() => {
                                                                    if (isSelected) {
                                                                        setSelectedNftId(undefined)
                                                                        setSelectedNftId(undefined)
                                                                    } else {
                                                                        setSelectedNftIdIdx(nftIdWithIndex)
                                                                        setSelectedNftId(nft.id)
                                                                    }
                                                                }}
                                                                    className={classNames("m-4", {
                                                                        'opacity-[0.5]': !isSelected && selectedNftId,
                                                                    })}
                                                                >
                                                                    <MyNftCard nft={nft} />
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (<></>)}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SendNftModal nft={selectedSendNft} onSuccess={() => {
                if (accountId) {
                    callMyOwnedNft({
                        ownerId: accountId
                    })
                }
                setSelectedNftId(undefined)
                setSelectedNftIdIdx(undefined)
            }} onClose={() => {
                setSelectedSendNft(undefined)
            }} />
        </>
    )
}

export default ProfileFeature