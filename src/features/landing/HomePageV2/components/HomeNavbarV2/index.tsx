import React from 'react'
import TheHuImg from './img/the-hu.png'
import MobileNavbarLogo from '@/assets/svg/mobile-navbar-logo.svg'
import Link from 'next/link'
import HomeCartWhiteSvg from '@/assets/svg/home-cart-white.svg'
import { BiMenuAltRight } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logoutSuccess, showAuthModal } from '@/store/reducer/auth-reducer/actions'
import HeartSvg from './img/heart.svg'
import ChevronDownSvg from '@/assets/svg/chevron-down.svg'
import ExitBlackSvg from '@/assets/svg/exit-black.svg'

type Props = {}

function HomeNavbarV2({ }: Props) {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isAuthLoading = useAppSelector(state => state.auth.isLoading)
    const profile = useAppSelector(state => state.auth.profile)

    return (
        <div className="flex justify-center w-full h-[64px] md:h-[93px] bg-white bg-opacity-[0.93]">
            <div className="container w-full h-full ">
                <div className="h-full px-0 navbar">
                    <div className="px-0 navbar-start md:hidden">
                        <Link href="/" className="text-xl normal-case btn btn-ghost">
                            <MobileNavbarLogo />
                        </Link>
                    </div>
                    <div className="hidden pl-0 navbar-start lg:flex">
                        <Link href="/" className="text-xl normal-case btn btn-ghost">
                            <img src={TheHuImg.src} className="w-auto h-full max-h-[16px]" />
                        </Link>
                        <ul className="px-1 ml-8 text-sm font-light menu menu-horizontal">
                            <li>
                                <Link className='text-black text-base font-bold text-opacity-[0.35] hover:text-opacity-[1]' href="/" rel="noreferrer">
                                    About us
                                </Link>
                            </li>
                            <li>
                                <Link className='text-black text-base font-bold text-opacity-[0.35] hover:text-opacity-[1]' href="/" rel="noreferrer">
                                    ArdCoin
                                </Link>
                            </li>
                            <li>
                                <Link className='text-black text-base font-bold text-opacity-[0.35] hover:text-opacity-[1]' href="/" rel="noreferrer">
                                    Metaland
                                </Link>
                            </li>
                            <li>
                                <Link className='text-black text-base font-bold text-opacity-[0.35] hover:text-opacity-[1]' href="/" rel="noreferrer">
                                    Help Center
                                </Link>
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
                                }} className="px-5 py-[14px] btn text-white btn-black text-sm text-opacity-[0.93] rounded-xl">
                                    Login
                                </button>
                                <button onClick={() => {
                                    dispatch(showAuthModal({
                                        type: 'register'
                                    }))
                                }} className="px-5 py-[14px] text-sm text-opacity-[0.93] font-bold bg-opacity-[0.04] text-black bg-black cursor-pointer rounded-xl">
                                    Signup
                                </button>
                                <div className='flex cursor-pointer justify-center items-center bg-black bg-opacity-[0.04] rounded-lg w-12 h-12'>
                                    <HeartSvg />
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