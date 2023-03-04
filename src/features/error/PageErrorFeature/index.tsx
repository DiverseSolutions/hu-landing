import { useAppSelector } from '@/store/hooks'
import React from 'react'

type Props = {
    children: React.ReactNode
}

function PageErrorFeature({ children }: Props) {

    const errorMsg = useAppSelector(state => state.error.pageErrorMessage)

    if (errorMsg) {
        return <div className="items-center justify-center w-full h-screen">{errorMsg}</div>
    }
    return (
        <>{children}</>
    )
}

export default PageErrorFeature