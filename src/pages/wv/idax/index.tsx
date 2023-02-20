import HomePage from '@/features/landing/HomePage'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {}

function WebViewIdax({ }: Props) {

    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const [code, setCode] = useState<string>()

    useEffect(() => {
        if (!Object.keys(router.query)) {
            return
        }
        const code = router.query.code as string
        if (code?.length) {
            setCode(code)
            setIsLoading(false)
        }
    }, [router.query])

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
        <HomePage />
    )
}

export default WebViewIdax