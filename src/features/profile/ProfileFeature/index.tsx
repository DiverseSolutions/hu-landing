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
import Head from 'next/head'

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

    useEffect(() => {
        const css = `@font-face {
            font-family: VideoJS;
            src: url("data:application/font-woff;charset=utf-8;base64,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") format('woff') !important;
            font-weight: normal;
            font-style: normal;
        }`,
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style') as any;

        head.appendChild(style);

        style.type = 'text/css';
        if (style.stylesheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }, [])

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