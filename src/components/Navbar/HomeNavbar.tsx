import React from 'react'
import HomeNavbarTheHuSvg from '@/assets/svg/home-navbar-the-hu.svg'
import Link from 'next/link'
import HomeCartWhiteSvg from '@/assets/svg/home-cart-white.svg'
import { BiMenuAltRight } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logoutSuccess, showAuthModal } from '@/store/reducer/auth-reducer/actions'
import CartBlackSvg from '@/assets/svg/cart-black.svg'
import ChevronDownSvg from '@/assets/svg/chevron-down.svg'
import ExitBlackSvg from '@/assets/svg/exit-black.svg'

type Props = {}

function HomeNavbar({ }: Props) {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isAuthLoading = useAppSelector(state => state.auth.isLoading)
    const profile = useAppSelector(state => state.auth.profile)

    return (
        <div className="flex justify-center w-full h-[100px]">
            <div className="container">
                <div className="py-8 bg-black navbar backdrop-blur-[7.5px] bg-opacity-[0.4]">
                    <div className="navbar-start md:hidden">
                        <a className="text-xl normal-case btn btn-ghost">
                            <HomeNavbarTheHuSvg />
                        </a>
                    </div>
                    <div className="hidden navbar-start lg:flex">
                        <a className="text-xl normal-case btn btn-ghost">
                            <HomeNavbarTheHuSvg />
                        </a>
                        <ul className="px-1 menu menu-horizontal text-white text-opacity-[0.35] text-base font-bold">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/">
                                    About the hu
                                </Link>
                            </li>
                            <li>
                                <a href="https://ardcoin.com" target="_blank" rel="noreferrer">
                                    ArdCoin
                                </a>
                            </li>
                            <li>
                                <a href="https://ard.art" target="_blank" rel="noreferrer">
                                    Ard Art
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-end">
                        {!isAuthLoading && isLoggedIn ? (
                            <>
                                <div className="items-center hidden md:flex">
                                    <div className="dropdown mw-md:dropdown-end dropdown-bottom md:dropdown-end">
                                        <label tabIndex={0} className="text-white rounded-lg btn btn-primary">
                                            {profile.username || profile.email || "User"}
                                            <div className="w-4 h-4 mx-2 bg-green-400 rounded-full">
                                            </div>
                                            <ChevronDownSvg />
                                        </label>
                                        <ul tabIndex={0} className="p-4 mt-3 space-y-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                            <li>
                                                <Link href="/profile" className="justify-between p-0">
                                                    <div className="p-4">Profile</div>
                                                </Link>
                                            </li>
                                            <li>
                                                <div onClick={() => {
                                                    dispatch(logoutSuccess())
                                                }} className="justify-between p-4">
                                                    Logout
                                                </div>
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
                            <div className="items-center hidden space-x-4 md:flex">
                                <button onClick={() => {
                                    dispatch(showAuthModal({
                                        type: 'login'
                                    }))
                                }} className="px-5 py-[14px] text-base font-bold text-black bg-white cursor-pointer rounded-xl">
                                    Login
                                </button>
                                <button onClick={() => {
                                    dispatch(showAuthModal({
                                        type: 'register'
                                    }))
                                }} className="px-5 py-[14px] text-base font-bold text-white border border-white border-opacity-[0.2] text-opacity-[0.65] bg-black cursor-pointer rounded-xl">
                                    Register
                                </button>
                                <div className='flex cursor-pointer'>
                                    <HomeCartWhiteSvg />
                                </div>
                            </div>
                        )}
                        <div className="md:hidden">
                            <label htmlFor='hu-drawer' className="btn btn-ghost">
                                <BiMenuAltRight color='white' size={48} />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeNavbar