import { withAuthLoader } from '@/components/AuthLoader'
import MyNftCard from '@/components/card/MyNftCard'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { showAuthModal } from '@/store/reducer/auth-reducer/actions'
import { useMyOwnedNftQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { IoFilter, IoReload } from 'react-icons/io5'
import ZondReloadSvg from '@/assets/svg/zond-reload.svg'
import { BiSearchAlt } from 'react-icons/bi'
import { CgLayoutGrid } from 'react-icons/cg'
import { CgLayoutGridSmall } from 'react-icons/cg'
import { MdExpandMore } from 'react-icons/md'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useMemo } from 'react'
import { ClipLoader } from 'react-spinners'
import { generateFromString } from 'generate-avatar'
import Avatar from '@/components/avatar/Avatar'
import { useLazyMonxanshRateQuery } from '@/store/rtk-query/monxansh/monxansh-api'
import { useLazyIdaxTickerQuery } from '@/store/rtk-query/idax/idax-api'
import PageLoader from '@/components/loader/PageLoader'

type Props = {}

const PorfileFeature = ({ }: Props) => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isLoginLoading = useAppSelector(state => state.auth.isLoading)
    const accountId = useAppSelector(state => state.auth.ardArt.accountId)
    const profile = useAppSelector(state => state.auth.profile)
    const dispatch = useAppDispatch()
    const { data: myNftData, isLoading: isMyNftLoading } = useMyOwnedNftQuery({ ownerId: accountId }, { skip: !isLoggedIn || !accountId, refetchOnMountOrArgChange: true })

    const router = useRouter()

    const [pageError, setPageError] = useState<string>()
    const [isRateLoading, setIsRateLoading] = useState(false)
    const [ardxToUsdRate, setArdxToUsdRate] = useState(0)

    const [searchInput, setSearchInput] = useState('')
    const [callMonxanshRate] = useLazyMonxanshRateQuery()
    const [callIdaxTicker] = useLazyIdaxTickerQuery()

    const fetchArdxToUsdRate = async () => {
        const [usdMntRate, ardxMntRate] = await Promise.all([
            callMonxanshRate({ currency: 'USD|MNT' }).unwrap(),
            callIdaxTicker({ symbol: 'ardx1557mont' }).unwrap()
        ]);
        const usdRate = usdMntRate.find((r) => r.code === 'USD');
        if (usdRate) {
            const ardxToUsd = parseFloat(ardxMntRate.last) / usdRate.rate_float
            setArdxToUsdRate(ardxToUsd)
            return ardxToUsd;
        }
        return undefined;
    }

    useEffect(() => {
        (async () => {
            setIsRateLoading(true)
            try {
                await fetchArdxToUsdRate()
            } catch (e) {
                console.log(e)
                setPageError("Currency error. Please try relad the page")
            }
            setIsRateLoading(false)
        })()
    }, [])

    useEffect(() => {
        if (!isLoggedIn && !isLoginLoading) {
            dispatch(showAuthModal({
                type: 'login'
            }))
        }
    }, [isLoggedIn, isLoginLoading])

    const visibleNfts = useMemo(() => {
        if (!myNftData?.result?.records?.length) {
            return []
        }
        if (searchInput?.length) {
            return myNftData?.result.records.filter((nft) => nft.name.toLowerCase().includes(searchInput.toLowerCase()))
        }
        return myNftData.result.records
    }, [myNftData, searchInput])

    if (isLoginLoading) {
        return <PageLoader />
    }

    if (pageError) {
        return <div className="items-center justify-center w-full h-screen">{pageError}</div>
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
        <div className="w-full px-4 pb-16 md:px-0">
            <div className="flex justify-center w-full">
                <div className="container">
                    <div className="mt-16">
                        <div className="flex justify-center w-full">
                            <div className="flex flex-col items-center">
                                <div className="w-32">
                                    <Avatar />
                                </div>
                                <div className="mt-4">
                                    <p className="text-[56px] max-w-[100%] font-bold">{profile.username}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16">
                        {isMyNftLoading ? <ClipLoader /> : <></>}
                        {myNftData?.result?.records?.length ? (
                            <div>
                                <div>
                                    <div className="tabs border-b-[1px] border-black border-opacity-[0.2]">
                                        <a className="text-base tab tab-bordered border-black border-b-[1px] tab-active">My Assets</a>
                                        <a className="text-base cursor-not-allowed border-b-[1px] tab tab-bordered border-transparent">Activity</a>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <div className="flex items-center flex-wrap md:flex-row w-full md:h-[48px]">
                                        <div className="flex h-full cursor-not-allowed items-center p-4 rounded-lg bg-black bg-opacity-[0.04]">
                                            <IoFilter size={20} />
                                            <span className="ml-4 text-sm font-bold">Filters</span>
                                        </div>
                                        <div className="flex h-full cursor-not-allowed items-center p-4 ml-4 bg-black rounded-lg bg-opacity-[0.04]">
                                            <ZondReloadSvg />
                                        </div>
                                        <div className="flex ml-0 md:ml-4 h-full items-center mt-4 md:mt-0  p-4 bg-black bg-opacity-[0.04] rounded-lg flex-grow">
                                            <BiSearchAlt className='opacity-[0.65]' />
                                            <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder='Search by NFTs' className='w-full ml-2 text-sm font-normal bg-transparent border-transparent rounded-lg outline-none' />
                                        </div>
                                        <div className="flex items-center mt-4 md:mt-0">
                                            <div className="flex cursor-not-allowed ml-0 md:ml-4   h-full rounded-lg bg-black bg-opacity-[0.04] p-4">
                                                <span className="text-sm font-bold">Price: Low to High</span>
                                                <MdExpandMore size={20} />
                                            </div>
                                            <div className="flex items-center cursor-not-allowed ml-4 h-full rounded-lg bg-black bg-opacity-[0.04] p-1">
                                                <div className="p-3">
                                                    <CgLayoutGrid size={20} />
                                                </div>
                                                <div className="p-3 bg-white rounded-lg">
                                                    <CgLayoutGridSmall size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {myNftData?.result?.count === 0 ? <p onClick={() => {
                                    router.push('/')
                                }} className='btn'>Buy Products</p> : <></>}
                                <div className="flex flex-col items-center mt-4 md:-ml-4 md:flex-wrap md:flex-row">
                                    {visibleNfts.map((nft) => (
                                        <div key={nft.id} className="m-4">
                                            <MyNftCard nft={nft} priceToUsdRate={ardxToUsdRate} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (<></>)}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PorfileFeature