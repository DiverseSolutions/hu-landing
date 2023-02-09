import MyNftCard from '@/components/card/MyNftCard'
import { times as _times } from 'lodash'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { showAuthModal } from '@/store/reducer/auth-reducer/actions'
import { useLazyMyOwnedNftQuery, useMyOwnedNftQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { IoFilter, IoReload } from 'react-icons/io5'
import ZondReloadSvg from '@/assets/svg/zond-reload.svg'
import { BiSearchAlt } from 'react-icons/bi'
import { CgLayoutGrid } from 'react-icons/cg'
import { CgLayoutGridSmall } from 'react-icons/cg'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useMemo } from 'react'
import { ClipLoader } from 'react-spinners'
import { generateFromString } from 'generate-avatar'
import Avatar from '@/components/avatar/Avatar'
import { useLazyMonxanshRateQuery } from '@/store/rtk-query/monxansh/monxansh-api'
import { useLazyIdaxTickerQuery } from '@/store/rtk-query/idax/idax-api'
import PageLoader from '@/components/loader/PageLoader'
import { useForm, UseFormHandleSubmit } from 'react-hook-form'
import classNames from 'classnames'

type Props = {

}

type MyAssetSearchFormData = {
    maxPrice?: number;
    minPrice?: number;
    category: number;
}
type MyAssetSearchFormProps = {
    isLoading: boolean;
    onSubmit: (data: MyAssetSearchFormData) => Promise<void>
}

const MyAssetSearchForm = (props: MyAssetSearchFormProps) => {

    const { handleSubmit, register } = useForm<MyAssetSearchFormData>({
        defaultValues: {
            minPrice: undefined,
            maxPrice: undefined,
            category: 1,
        }
    })

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className='pb-6 border-b border-black border-opacity-[0.2]'>
                <div className="flex justify-between w-full">
                    <span className="font-bold opacity-[0.65] text-base">Price</span>
                    <span><MdExpandLess size={24} /></span>
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <input {...register('minPrice', { valueAsNumber: true })} placeholder='Min' className='w-[4rem] p-3 rounded-xl mr-4 bg-black bg-opacity-[0.04] outline-none' />
                            <span>to</span>
                            <input {...register('maxPrice', { valueAsNumber: true })} placeholder='Max' className='w-[4rem] p-3 rounded-xl ml-4 bg-black bg-opacity-[0.04] outline-none' />
                        </div>
                        <div className="ml-4 dropdown dropdown-end">
                            <label tabIndex={0} className="mr-8 bg-black bg-opacity-[0.04] rounded-xl flex p-3 text-base cursor-pointer">ARDX <span><MdExpandMore size={24} /></span></label>
                            {/* <ul tabIndex={1} className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52">
                                <li><a>ARDX</a></li>
                            </ul> */}
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <button type="submit" className={classNames('btn btn-black btn-block rounded-xl', { 'loading': props.isLoading })}>
                        Apply
                    </button>
                </div>
            </div>
            <div className="mt-8">
                <div className="flex pb-6 border-b border-black border-opacity-[0.2] justify-between w-full">
                    <span className="font-bold opacity-[0.65] text-base">Type</span>
                    <span><MdExpandLess size={24} /></span>
                </div>
            </div>
            <div className="mt-8">
                <div className="flex pb-6 border-b border-black border-opacity-[0.2] justify-between w-full">
                    <span className="font-bold opacity-[0.65] text-base">Collection</span>
                    <span><MdExpandLess size={24} /></span>
                </div>
            </div>
        </form>
    )
}

const PorfileFeature = ({ }: Props) => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isLoginLoading = useAppSelector(state => state.auth.isLoading)
    const accountId = useAppSelector(state => state.auth.ardArt.accountId)
    const profile = useAppSelector(state => state.auth.profile)
    const dispatch = useAppDispatch()

    const [minPrice, setMinPrice] = useState<number>()
    const [maxPrice, setMaxPrice] = useState<number>()
    const [searchCategoryId, setSearchCategoryId] = useState<number>()

    const [callMyOwnedNft, { data: myNftData, isLoading: isMyNftLoading, isFetching: isMyNftFetching }] = useLazyMyOwnedNftQuery()

    useEffect(() => {
        if (isLoggedIn && accountId) {
            callMyOwnedNft({
                ownerId: accountId,
                category: searchCategoryId,
                minPrice,
                maxPrice
            })
        }
    }, [isLoggedIn, accountId])

    const handleSearch = async () => {
        if (isLoggedIn && accountId) {
            await callMyOwnedNft({
                ownerId: accountId,
            })
        }
    }

    const router = useRouter()

    const [pageError, setPageError] = useState<string>()
    const [isRateLoading, setIsRateLoading] = useState(false)
    const [isFilterVisible, setIsFilterVisible] = useState(false)
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
                        <div>
                            <div>
                                <div className="tabs border-b-[1px] border-black border-opacity-[0.2]">
                                    <a className="text-base tab tab-bordered border-black border-b-[1px] tab-active">My Assets</a>
                                    <a className="text-base cursor-not-allowed border-b-[1px] tab tab-bordered border-transparent">Activity</a>
                                </div>
                            </div>
                            <div className="mt-6">
                                <div className="flex items-center cursor-pointer flex-wrap md:flex-row w-full md:h-[48px]">
                                    <div onClick={() => setIsFilterVisible(!isFilterVisible)} className="flex dropdown dropdown-bottom h-full items-center p-4 rounded-lg bg-black bg-opacity-[0.04]">
                                        <span tabIndex={0} className="flex items-center">
                                            <IoFilter size={20} />
                                            <span className="ml-4 text-sm font-bold">Filters</span>
                                        </span>
                                        <div tabIndex={0} className="dropdown-content">
                                            <div className='flex mt-8 mb-4 mr-8'>
                                                <div className="flex flex-col">
                                                    <div className="bg-white border rounded-lg card w-96">
                                                        <div className="card-body">
                                                            <MyAssetSearchForm isLoading={isMyNftFetching} onSubmit={async (d) => {
                                                                await callMyOwnedNft({
                                                                    ownerId: accountId,
                                                                    minPrice: d.minPrice,
                                                                    maxPrice: d.maxPrice,
                                                                })
                                                            }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                            <div className="flex w-full">
                                {isMyNftFetching ? (
                                    <div className='w-full flex justify-center items-center min-h-[400px]'>
                                        <ClipLoader />
                                    </div>
                                ) : (<></>)}
                                {!isMyNftFetching ? (
                                    <div className="flex flex-col items-center mt-4 md:-ml-4 md:flex-wrap md:flex-row">
                                        {visibleNfts.map((nft) => (
                                            <>
                                                {_times(nft.ownerAmount, (num) => (
                                                    <div key={`${nft.id}_${num}`} className="m-4">
                                                        <MyNftCard nft={nft} priceToUsdRate={ardxToUsdRate} />
                                                    </div>
                                                ))}
                                            </>
                                        ))}
                                    </div>
                                ) : (<></>)}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PorfileFeature