import Link from 'next/link'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { ClipLoader } from 'react-spinners'
import { logoutSuccess, showAuthModal } from '@/store/reducer/auth-reducer/actions'
import TheHuBlackSvg from '@/assets/svg/the-hu-black.svg'
import CartBlackSvg from '@/assets/svg/cart-black.svg'
import ChevronDownSvg from '@/assets/svg/chevron-down.svg'
import ExitBlackSvg from '@/assets/svg/exit-black.svg'
import Avatar from '../avatar/Avatar'

type Props = {}

export default function Navbar({ }: Props) {

    const dispatch = useAppDispatch()
    const isAuthLoading = useAppSelector(state => state.auth.isLoading)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const profile = useAppSelector(state => state.auth.profile)

    return (
        <>
            <div className="z-50 flex justify-center w-full py-6 border-b-2 navbar bg-base-100">
                <div className="container">
                    <div className="flex items-center w-full">
                        <div className="flex-1">
                            <Link href="/" className="text-xl normal-case btn btn-ghost">
                                <div className='mw-md:transform mw-md:scale-[0.72] mw-md:w-[128px]'><TheHuBlackSvg /></div>
                            </Link>
                        </div>
                        <div className="flex items-center ml-4 md:ml-0">
                            <div className="p-3 mr-4 hidden md:block rounded-lg disabled dropdown dropdown-left md:dropdown-end bg-black bg-opacity-[0.04]">
                                <label tabIndex={0} className="">
                                    <div className="indicator">
                                        <CartBlackSvg />
                                    </div>
                                </label>
                            </div>
                            {isAuthLoading ? (
                                <ClipLoader
                                    color={"black"}
                                    loading={true}
                                    cssOverride={{
                                        display: "block",
                                        margin: "0 auto",
                                        borderColor: "#fff",
                                    }}
                                    size={32}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            ) : (<></>)}
                            {!isAuthLoading && isLoggedIn ? (
                                <>
                                    <div className="flex items-center">
                                        <div className="dropdown mw-md:dropdown-end dropdown-bottom md:dropdown-end">
                                            <label tabIndex={0} className="text-white rounded-lg btn btn-primary">
                                                {profile.username || profile.email || "User"}
                                                <div className="w-4 h-4 mx-2 bg-green-400 rounded-full">
                                                </div>
                                                <ChevronDownSvg />
                                            </label>
                                            <ul tabIndex={0} className="p-4 mt-3 space-y-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                                <li>
                                                    <Link href="/profile" className="justify-between p-4">
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <a onClick={() => {
                                                        dispatch(logoutSuccess())
                                                    }} className="justify-between p-4">
                                                        Logout
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <button onClick={() => {
                                        dispatch(logoutSuccess())
                                    }} className='rounded-lg hidden md:block bg-opacity-[0.04] p-3 bg-black ml-4'>
                                        <ExitBlackSvg />
                                    </button>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                            {!isAuthLoading && !isLoggedIn ? (
                                <>
                                    <label onClick={() => {
                                        dispatch(showAuthModal({
                                            type: 'login'
                                        }))
                                    }} className="ml-2 btn btn-black md:btn-wide max-w-[200px]">
                                        Login
                                    </label>
                                </>
                            ) : (<></>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}