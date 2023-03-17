import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {}

function WebViewIdax({ }: Props) {

    const router = useRouter()
    const [pageError, setPageError] = useState<string>()
    const isLoading = !pageError

    useEffect(() => {
        if (!router.isReady) {
            return
        }
        router.push('/')
    }, [router.isReady])


    if (pageError) {
        return (
            <div className="w-full h-screen overflow-hidden bg-black">
                <div className="flex items-center justify-center w-full h-full">
                    <p className="text-white">{pageError}</p>
                </div>
            </div>
        )
    }
    if (isLoading) {
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