import MyNftCard from '@/components/card/MyNftCard'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { showAuthModal } from '@/store/reducer/auth-reducer/actions'
import { useMyOwnedNftQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {}

export default function PorfileFeature({ }: Props) {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const accountId = useAppSelector(state => state.auth.ardArt.accountId)
    const dispatch = useAppDispatch()
    const { data: myNftData, isLoading: isMyNftLoading } = useMyOwnedNftQuery({ ownerId: accountId }, { skip: !isLoggedIn || !accountId, refetchOnMountOrArgChange: true })

    const router = useRouter()

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(showAuthModal({
                type: 'login'
            }))
        }
    }, [isLoggedIn])


    if (!isLoggedIn) {
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
                    <div className="mt-32">
                        {isMyNftLoading ? <ClipLoader /> : <></>}
                        {myNftData?.result?.records?.length ? <p className='mb-8 text-4xl font-bold'>Purchase History</p> : <></>}
                        <div className="flex flex-wrap items-start space-x-4 space-y-4">
                            {myNftData?.result?.count === 0 ? <p onClick={() => {
                                router.push('/')
                            }} className='btn'>Buy Products</p> : <></>}
                            {myNftData?.result?.records?.map((nft) => (
                                <MyNftCard key={nft.id} nft={nft} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}