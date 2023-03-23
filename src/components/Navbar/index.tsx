import React, { useEffect } from 'react'
import TheHuImg from './img/the-hu.png'
import Link from 'next/link'
import TheHuMobileImg from './img/the-hu-mobile.png'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logoutSuccess, showAuthModal } from '@/store/reducer/auth-reducer/actions'
import HeartSvg from './img/heart.svg'
import ChevronDownSvg from '@/assets/svg/chevron-down.svg'
import ExitBlackSvg from '@/assets/svg/exit-black.svg'
import MenuSvg from './img/menu.svg'
import PersonSvg from './img/person.svg'

type Props = {}

function Navbar({ }: Props) {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isAuthLoading = useAppSelector(state => state.auth.isLoading)
    const profile = useAppSelector(state => state.auth.profile)

    return (
        <div className="flex transition-all duration-100 fixed z-[100] top-0 justify-center w-full backdrop-blur-[7.5px] h-[64px] md:h-[96px] bg-white bg-opacity-[0.93]">
            <div className="container w-full h-full px-4 md:px-0">
                <div className="h-full px-0 navbar">
                    <div className="px-0 navbar-start md:hidden">
                        <Link href="/" className="text-xl normal-case">
                            <img src={TheHuMobileImg.src} className="object-contain w-auto h-3" />
                        </Link>
                    </div>
                    <div className="hidden pl-0 navbar-start lg:flex" style={{
                        width: '100%',
                    }}>
                        <Link href="/" className="text-xl normal-case">
                            <img src={TheHuImg.src} className="w-auto h-full max-h-[16px]" />
                        </Link>
                        <ul className="px-1 ml-8 text-sm font-light menu menu-horizontal">
                            <li>
                                <a target="_blank" className='text-black focus:bg-transparent focus:text-opacity-[0.93] hover:bg-transparent text-base font-bold text-opacity-[0.35] hover:text-opacity-[1]' href="https://ardcoin.com" rel="noreferrer">
                                    ArdCoin
                                </a>
                            </li>
                            <li>
                                <a target="_blank" className='text-black focus:bg-transparent focus:text-opacity-[0.93] hover:bg-transparent text-base font-bold text-opacity-[0.35] hover:text-opacity-[1]' href="https://www.thehuofficial.com/merch-1" rel="noreferrer">
                                    HU Official Merch
                                </a>
                            </li>
                            <li>
                                <a target="_blank" className='text-black focus:bg-transparent focus:text-opacity-[0.93] hover:bg-transparent text-base font-bold text-opacity-[0.35] hover:text-opacity-[1]' href="https://metaland.mn" rel="noreferrer">
                                    Metaland
                                </a>
                            </li>
                            <li>
                                <Link className='text-black hover:bg-transparent focus:bg-transparent focus:text-opacity-[0.93] text-base font-bold text-opacity-[0.35] hover:text-opacity-[1]' href="/help" rel="noreferrer">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <span onClick={() => {
                                    document.getElementById('coupon-modal')?.click()
                                }} className='text-black hover:bg-transparent focus:bg-transparent focus:text-opacity-[0.93] text-base font-bold text-opacity-[0.35] hover:text-opacity-[1]'>
                                    Use Coupon Code
                                </span>
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
                            <div className="items-center hidden space-x-2 md:flex">
                                <button onClick={() => {
                                    dispatch(showAuthModal({
                                        type: 'login'
                                    }))
                                }} className="py-2.5 px-4 bg-black text-white text-sm text-opacity-[0.93] rounded-xl">
                                    Login
                                </button>
                                <button onClick={() => {
                                    dispatch(showAuthModal({
                                        type: 'register'
                                    }))
                                }} className="py-2.5 px-4 h-full hover:bg-black hover:bg-opacity-[0.04] text-sm text-opacity-[0.93] font-bold bg-opacity-[0.04] text-black bg-black cursor-pointer rounded-xl">
                                    Signup
                                </button>
                                <div className='flex cursor-pointer justify-center items-center bg-black bg-opacity-[0.04] rounded-xl p-3'>
                                    <HeartSvg />
                                </div>
                            </div>
                        )}
                        <div className="md:hidden">
                            <div className="flex space-x-2">
                                {isLoggedIn ? (
                                    <Link href="/profile" className='bg-black flex justify-center items-center w-[44px] h-[44px] bg-opacity-[0.04] rounded-xl p-3'><PersonSvg size={20} /></Link>
                                ) : (<></>)}
                                <div className='bg-black flex justify-center items-center w-[44px] h-[44px] bg-opacity-[0.04] rounded-xl p-3'><HeartSvg size={20} /></div>
                                <label htmlFor='hu-drawer'>
                                    {/* <BiMenuAltRight color='black' size={48} /> */}
                                    <div className='bg-black flex justify-center items-center w-[44px] h-[44px] bg-opacity-[0.04] rounded-xl p-3'><MenuSvg size={20} /></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar