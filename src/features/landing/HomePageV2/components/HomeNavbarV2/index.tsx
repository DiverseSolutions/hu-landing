import React from 'react'
import TheHuImg from './img/the-hu.png'
import MobileNavbarLogo from '@/assets/svg/mobile-navbar-logo.svg'
import Link from 'next/link'
import HomeCartWhiteSvg from '@/assets/svg/home-cart-white.svg'
import { BiMenuAltRight } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logoutSuccess, showAuthModal } from '@/store/reducer/auth-reducer/actions'
import ChevronDownSvg from '@/assets/svg/chevron-down.svg'
import ExitBlackSvg from '@/assets/svg/exit-black.svg'

type Props = {}

function HomeNavbarV2({ }: Props) {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isAuthLoading = useAppSelector(state => state.auth.isLoading)
    const profile = useAppSelector(state => state.auth.profile)

    return (
        <div className="flex justify-center w-full h-[64px] md:h-[100px] backdrop-blur-[7.5px] bg-white bg-opacity-[0.01] isolate">
            <div className="container w-full h-full ">
                <div className="h-full px-0 navbar">
                    <div className="px-0 navbar-start md:hidden">
                        <Link href="/" className="text-xl normal-case btn btn-ghost">
                            <MobileNavbarLogo />
                        </Link>
                    </div>
                    <div className="hidden pl-0 navbar-start lg:flex">
                        <a className="text-xl normal-case btn btn-ghost">
                            <img src={TheHuImg.src} className="w-auto h-full max-h-[16px]" />
                        </a>
                    </div>
                    <div className="hidden pl-0 uppercase navbar-center lg:flex">
                        <ul className="px-1 text-sm font-light menu menu-horizontal">
                            <li>
                                <a className='text-white text-opacity-[0.35] hover:text-opacity-[1]' href="/" rel="noreferrer">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a className='text-white text-opacity-[0.35] hover:text-opacity-[1]' href="/" target="_blank" rel="noreferrer">
                                    About the hu
                                </a>
                            </li>
                            <li>
                                <a className='text-white text-opacity-[0.35] hover:text-opacity-[1]' href="https://ardcoin.com" target="_blank" rel="noreferrer">
                                    ArdCoin
                                </a>
                            </li>
                            <li>
                                <a className='text-white text-opacity-[0.35] hover:text-opacity-[1]' href="https://metaland.mn/en" target="_blank" rel="noreferrer">
                                    Metaland
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
                                }} className="px-5 py-[14px] text-sm text-opacity-[0.93] bg-opacity-[0.93] hover:bg-opacity-1 text-black bg-white cursor-pointer rounded-xl">
                                    Login
                                </button>
                                <button onClick={() => {
                                    dispatch(showAuthModal({
                                        type: 'register'
                                    }))
                                }} className="px-5 py-[14px] text-sm text-opacity-[0.93] bg-opacity-[0.04] text-white bg-black cursor-pointer rounded-xl">
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

export default HomeNavbarV2