import { useAppSelector } from '@/store/hooks'
import React from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {
    children: JSX.Element
}

const AuthLoader: React.FC<Props> = ({ children }) => {

    const isAuthLoading = useAppSelector(state => state.auth.isLoading)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (isAuthLoading) {
        return (
            <div className="flex items-center justify-center w-full h-full min-h-[60vh]">
                <ClipLoader />
            </div>
        )
    }
    return (
        children
    )
}

export function withAuthLoader<T extends JSX.IntrinsicAttributes>(Component: React.ComponentType<T>) {
    const ComponentWithAuthLoader = (props: T) => {
        return (
            <AuthLoader>
                <Component {...props} />
            </AuthLoader>
        )
    }
    return ComponentWithAuthLoader;
}

export default AuthLoader;