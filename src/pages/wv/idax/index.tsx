import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {}

function WebViewIdax({ }: Props) {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [pageError, setPageError] = useState<string>()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const session = useAppSelector(state => state.auth.session)
    const isAuthLoading = useAppSelector(state => state.auth.isLoading)

    useEffect(() => {
        if (!router.isReady) {
            return
        }
        if (!isAuthLoading && !isLoggedIn) {
            setPageError("Session Expired. Please try reload the page.")
        }
        if (!isAuthLoading && (session === 'idax-wv') && isLoggedIn) {
            router.push('/')
        }
        setPageError("Invalid login session")
    }, [session, isLoggedIn, isAuthLoading, isLoading, router.isReady])


    if (pageError) {
        return (
            <div className="w-full h-screen overflow-hidden bg-black">
                <div className="flex items-center justify-center w-full h-full">
                    <p className="text-white">{pageError}</p>
                </div>
            </div>
        )
    }
    if (isAuthLoading) {
        return (
            <div className="w-full h-screen overflow-hidden bg-black">
                <div className="flex items-center justify-center w-full h-full">
                    <ClipLoader color='white' />
                </div>
            </div>
        )
    }
    return (
        <div className="w-full h-screen overflow-hidden bg-black">
            <div className="flex items-center justify-center w-full h-full">
                <p className="text-white">An unknown error occured. Please try reload the page.</p>
            </div>
        </div>
    )
}

export default WebViewIdax