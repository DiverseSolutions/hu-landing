import { withAuthLoader } from '@/components/AuthLoader'
import MyNftCard from '@/components/card/MyNftCard'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { showAuthModal } from '@/store/reducer/auth-reducer/actions'
import { useMyOwnedNftQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { ClipLoader } from 'react-spinners'
import { generateFromString } from 'generate-avatar'
import Avatar from '@/components/avatar/Avatar'

type Props = {}

const PorfileFeature = ({ }: Props) => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isLoginLoading = useAppSelector(state => state.auth.isLoading)
    const accountId = useAppSelector(state => state.auth.ardArt.accountId)
    const profile = useAppSelector(state => state.auth.profile)
    const dispatch = useAppDispatch()
    const { data: myNftData, isLoading: isMyNftLoading } = useMyOwnedNftQuery({ ownerId: accountId }, { skip: !isLoggedIn || !accountId, refetchOnMountOrArgChange: true })

    const router = useRouter()

    useEffect(() => {
        if (!isLoggedIn && !isLoginLoading) {
            dispatch(showAuthModal({
                type: 'login'
            }))
        }
    }, [isLoggedIn, isLoginLoading])

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
                        {myNftData?.result?.records?.length ? <p className='mb-8 text-4xl font-bold border-b-[1px] pb-6'>My Assets</p> : <></>}
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

export default withAuthLoader(PorfileFeature)