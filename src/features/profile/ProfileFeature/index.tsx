import MyNftCard from '@/components/card/MyNftCard'
import { times as _times } from 'lodash'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { showAuthModal } from '@/store/reducer/auth-reducer/actions'
import { useHelperLiveQuery, useLazyMyNftCountQuery, useLazyMyOwnedNftQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import React, { useEffect, useState, useMemo } from 'react'
import { ClipLoader } from 'react-spinners'
import PageLoader from '@/components/loader/PageLoader'
import classNames from 'classnames'
import { useArdxBalanceQuery } from '@/store/rtk-query/ard-art/ard-art-api'
import InfoGreySvg from './img/info-grey.svg'
import SystemRequirementsContent from '@/components/common/SystemRequirementsContent'
import { toast } from 'react-toastify'
import { ASSET_CATEGORY, BUNDLE_CATEGORY } from '@/lib/consts'
import { CategoryItemType } from '@/components/common/CategorySelectList/types'
import CategorySelectList from '@/components/common/CategorySelectList'
import { ArdArtHelperLiveResult, ArdArtMyOwnedNftRecord } from '@/store/rtk-query/hux-ard-art/types'
import SendNftModal from '@/components/modals/SendNftModal'
import WarningSvg from './img/warning.svg'
import BiUserSvg from './img/BiUser.svg'
import BiUserDesktop from './img/BiUserDesktop.svg'
import { isMacOs } from 'react-device-detect'
import DirectorCutVideo from '@/components/video/DirectorCutVideo'
import { useRouter } from 'next/router'

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

    const [isMounted, setIsMounted] = useState(false)
    const [activeCategory, setActiveCategory] = useState<CategoryItemType[]>([])
    const [activeTag, setActiveTag] = useState<CategoryItemType[]>([])
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isLoginLoading = useAppSelector(state => state.auth.isLoading)
    const accountId = useAppSelector(state => state.auth.ardArt.accountId)
    const profile = useAppSelector(state => state.auth.profile)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [callMyNftCount, { data: myNftCountData, isFetching: isMyNftCountFetching }] = useLazyMyNftCountQuery()
    const [callMyOwnedNft, { data: myNftData, isLoading: isMyNftLoading, isFetching: isMyNftFetching }] = useLazyMyOwnedNftQuery()
    const [helperLiveDataLatest, setHelperLiveDataLatest] = useState<ArdArtHelperLiveResult>()

    const { isFetching: isHelperLiveFetching, data: helperLiveData, error: helperLiveError } = useHelperLiveQuery(undefined, {
        skip: !router.isReady || !isLoggedIn,
        pollingInterval: helperLiveDataLatest ? 0 : 10000
    })

    useEffect(() => {
        if (helperLiveError) {
            console.log(`live err:`)
            console.log(helperLiveError)
        }
    }, [helperLiveError])

    useEffect(() => {
        setHelperLiveDataLatest(helperLiveData?.result || undefined)
    }, [helperLiveData])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (isLoggedIn && accountId) {
            callMyOwnedNft({
                ownerId: accountId
            })
            callMyNftCount({
                accountId
            })
        }
    }, [isLoggedIn, accountId])

    const [liveErrorCode, setLiveErrorCode] = useState(0)
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

    const visibleNftsDuplicated = useMemo(() => {
        if (!visibleNfts?.length) {
            return []
        }
        const duplicated: JSX.Element[] = []
        visibleNfts.forEach((nft) => (
            _times(nft.ownerAmount, (num) => {
                const nftIdWithIndex = `${nft.id}_${num}`
                const isSelected = selectedNftIdIdx === nftIdWithIndex
                duplicated.push(<div key={nftIdWithIndex}
                    className={classNames({
                        'opacity-[0.5]': !isSelected && selectedNftId,
                    })}
                >
                    <MyNftCard nft={nft} onSend={() => {
                        setSelectedNftIdIdx(nftIdWithIndex)
                        setSelectedNftId(nft.id)
                        handleSendNft(nft.id)
                    }} />
                </div>)
            })
        ))
        return duplicated
    }, [visibleNfts])

    const { data: ardxBalance, isLoading: isBalanceLoading } = useArdxBalanceQuery()

    const handleSendNft = (selectedNftId: number) => {
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
            <div className="flex px-4 md:px-0 flex-col items-center justify-center w-full min-h-[600px]">
                <p onClick={() => dispatch(showAuthModal({
                    type: 'login'
                }))} className="text-xl font-medium">Please log in to continue.</p>
                <button onClick={() => {
                    dispatch(showAuthModal({
                        type: 'login'
                    }))
                }} className="px-4 md:max-w-[300px] py-2 mt-4 btn-block btn btn-black">
                    Login
                </button>
            </div>
        )
    }

    return (
        <>
            <div className="relative w-full overflow-x-hidden">
                <div className="w-full px-4 pb-16 transform md:px-0">
                    <div className="flex justify-center w-full">
                        <div className="container">
                            <div className="flex flex-col justify-center w-full md:justify-between md:flex-row">
                                <div className="mt-12">
                                    <div className="flex justify-start w-full h-full">
                                        <div className="w-10 md:w-[68px] md:h-[68px] overflow-hidden relative h-10 rounded-xl bg-black bg-opacity-[0.04]">
                                            <div className='transform md:hidden flex translate-y-[8px]'><BiUserSvg /></div>
                                            <div className='transform hidden md:flex translate-y-[16px]'><BiUserDesktop /></div>
                                        </div>
                                        <div className="flex items-center p-2 md:p-4 bg-black bg-opacity-[0.04] rounded-xl ml-2">
                                            <p className="text-base md:text-[32px] font-bold">{profile?.username}</p>
                                        </div>
                                        <div className="px-4 ml-2 flex-col py-3 bg-black rounded-xl bg-opacity-[0.04] hidden md:flex justify-center items-center">
                                            {isMyNftCountFetching ? (<ClipLoader size={14} />) : (<p className='text-sm md:text-[20px] font-bold'>{myNftCountData?.result?.nftCount || 0}</p>)}
                                            <p className='text-xs opacity-[0.65]'>Total NFTs</p>
                                        </div>
                                        <div className="px-4 ml-2 hidden md:flex flex-col py-3 bg-black rounded-xl bg-opacity-[0.04] justify-center items-center">
                                            <p className='text-sm font-bold md:text-[20px]'>{0}</p>
                                            <p className='text-xs opacity-[0.65]'>Sent</p>
                                        </div>
                                        <div className="px-4 ml-2 flex-col py-3 bg-black rounded-xl bg-opacity-[0.04] hidden md:flex justify-center items-start">
                                            {!isBalanceLoading ? (<p className='text-sm font-bold md:text-[20px]'>ARDX{ardxBalance?.amount || 0}</p>) : (<ClipLoader size={20} />)}
                                            <p className='text-xs opacity-[0.65]'>Balance</p>
                                        </div>
                                        <div className="flex md:hidden items-center md:py-3 px-4 py-2 bg-black bg-opacity-[0.04] rounded-xl ml-2">
                                            <span className='mr-2 text-xs opacity-[0.65]'>Balance</span>
                                            {isBalanceLoading ? (<ClipLoader size={14} />) : (<p className="text-sm font-bold">ARDX{ardxBalance?.amount || 0}</p>)}
                                        </div>
                                        <button className={classNames("h-full hidden md:block max-h-full ml-2 btn btn-black text-[20px]", {
                                            'pointer-events-none': true,
                                        })}>
                                            <div className="flex items-center">
                                                {isHelperLiveFetching ? <ClipLoader size={24} color="white" /> : <></>}
                                                <div className="flex flex-col items-start ml-2">
                                                    {helperLiveData?.result ? <div className='text-[#FF00A8] text-xs font-bold block'>Live</div> : <div className='text-[#FF00A8] text-xs font-bold block'>Soon</div>}
                                                    <div>Watch Concert</div>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex mt-2 md:hidden">
                                    <div className="px-4 flex-col py-3 bg-black rounded-xl bg-opacity-[0.04] flex justify-center items-center">
                                        {isMyNftCountFetching ? (<ClipLoader size={14} />) : (<p className='text-sm md:text-[20px] font-bold'>{myNftCountData?.result?.nftCount || 0}</p>)}
                                        <p className='text-xs opacity-[0.65]'>Total NFTs</p>
                                    </div>
                                    <div className="px-4 ml-2 flex-col py-3 bg-black rounded-xl bg-opacity-[0.04] flex justify-center items-center">
                                        <p className='text-sm font-bold md:text-[20px]'>{0}</p>
                                        <p className='text-xs opacity-[0.65]'>Sent</p>
                                    </div>
                                </div>
                                <button className={classNames("h-full block md:hidden mt-2 max-h-full py-3 ml-2 btn btn-black text-[20px] pointer-events-none")}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col items-start ml-2">
                                            {helperLiveData?.result ? <div className='text-[#FF00A8] text-xs font-bold block'>Live</div> : <div className='text-[#FF00A8] text-xs font-bold block'>Soon</div>}
                                            <div>Watch Concert</div>
                                        </div>
                                        {isHelperLiveFetching ? <ClipLoader size={24} color="white" /> : <></>}
                                    </div>
                                </button>
                            </div>
                            {helperLiveData?.result ? (
                                <div className="relative mt-8">
                                    <DirectorCutVideo live={helperLiveData.result} />
                                    <div className="absolute top-4 left-4">
                                        <div className="flex items-center px-4 py-2 bg-black rounded-xl">
                                            <span className="w-2.5 h-2.5 mr-2 bg-red-600 rounded-full">

                                            </span>
                                            <p className="font-bold text-white uppercase ">Live</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (<></>)}
                            {!isHelperLiveFetching && !helperLiveData?.result ? (
                                <div className="flex p-4 mt-4 w-f8ll rounded-xl itms-start" style={{ background: 'rgba(255, 140, 0, 0.05)' }}>
                                    <div><WarningSvg /></div>
                                    <span className='text-xs ml-[18px]'>The live concert has not yet begun. The start time of the concert will depend on the region you have chosen and the timezone that is currently set. We want to remind all users with entry tickets that they will have access to the concert as soon as it begins in their respective region.</span>
                                </div>
                            ) : (<></>)}
                            <div className="mt-8">
                                <div className="md:p-8 p-4 rounded-xl w-ful bg-black bg-opacity-[0.04]">
                                    <div className="flex flex-col justify-between w-full space-y-4 md:space-y-0 md:flex-row">
                                        <div className="flex flex-col">
                                            <p className="text-base font-bold md:text-lg">How to watch the concert?</p>
                                            <p className='md:text-base text-sm mt-4 text-black opacity-[0.65]'>Please download and install this file on a computer that meets the system requirement and runs on Windows OS or MacOS. By meeting the system requirements you will be able to enjoy the concert in high quality. The HU in the Metaverse concert is now available for worldwide download.</p>
                                        </div>
                                        <div className="flex flex-col">
                                            {isMounted && isMacOs ? (
                                                <a href="https://d36xgupx7xb4yr.cloudfront.net/public/TheHU.zip" target="_blank" rel="noreferrer" className="md:w-[450px]">
                                                    <div className="bg-white w-full text-black text-opacity-[0.93] bg-opacity-[0.93] text-sm md:text-[20px] py-[14px] px-6 md:py-[14px] rounded-xl font-bold text-center">
                                                        <span>Download (MacOS)</span>
                                                    </div>
                                                </a>
                                            ) : (<a href="https://d36xgupx7xb4yr.cloudfront.net/public/TheHU.rar" target="_blank" rel="noreferrer" className="md:w-[450px]">
                                                <div className="bg-white w-full text-black text-opacity-[0.93] bg-opacity-[0.93] text-sm md:text-base px-6 py-2.5 md:py-[14px] rounded-xl font-bold text-center">
                                                    <span>Download (Windows)</span>
                                                </div>
                                            </a>)}

                                            <div tabIndex={0} className="mt-4 z-50 dropdown bg-black bg-opacity-[0.04] md:dropdown-hover md:dropdown-bottom dropdown-top cursor-pointer items-center flex w-full justify-center py-[14px] backdrop-blur-[7.5px] rounded-xl">
                                                <InfoGreySvg />
                                                <span className="ml-2  text-black text-opacity-[0.65] text-sm md:text-[20px] font-bold">System Requirements</span>
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
                                            <a className="text-sm md:text-base tab tab-bordered border-black border-b-[1px] tab-active font-bold">My Assets</a>
                                            <a className="text-sm md:text-base cursor-not-allowed border-b-[1px] tab tab-bordered border-transparent font-bold opacity-[0.35]">Activity</a>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex items-center w-full p-4 rounded-lg" style={{ background: 'rgba(255, 140, 0, 0.05)' }}>
                                            <span><WarningSvg /></span>
                                            <span className='text-xs md:text-sm ml-[18px]'>You can only transfer one NFT at a time. Please check the NFT before proceeding with transfer.</span>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <div className="flex items-center max-w-[100vw] overflow-x-auto no-scrollbar">
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
                                            <div className="grid w-full grid-cols-2 gap-4 px-0 mt-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                                                {visibleNftsDuplicated}
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
                    callMyNftCount({
                        accountId
                    })
                }
                setSelectedNftId(undefined)
                setSelectedNftIdIdx(undefined)
            }} onClose={() => {
                setSelectedSendNft(undefined)
                setSelectedNftId(undefined)
                setSelectedNftIdIdx(undefined)
            }} />
        </>
    )
}

export default ProfileFeature