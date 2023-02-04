import React from 'react'

import TheHu from '@/assets/svg/the-hu.svg'
import MediumSvg from '@/assets/svg/medium.svg'
import InstagramSvg from '@/assets/svg/instagram.svg'
import FacebookSvg from '@/assets/svg/facebook.svg'
import DiscordSvg from '@/assets/svg/discord.svg'
import heroLeft from '@/assets/img/hero-left.png'
import CopyRightSvg from '@/assets/svg/copyright.svg'
import CartSvg from '@/assets/svg/cart.svg'
import ChevronDownSvg from '@/assets/svg/chevron-down.svg'
import heroRight from '@/assets/img/hero-right.png'
import Image from 'next/image'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logoutSuccess, showAuthModal } from '@/store/reducer/auth-reducer/actions'

import styles from './styles.module.css'

type Props = {}

export default function LandingWithComingSoon({ }: Props) {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const username = useAppSelector(state => state.auth.profile?.username)

    return (
        <>
            <div className='h-[100vh] bg-[#982626] relative overflow-hidden'>
                <div className="absolute top-0">
                    <div className="relative">
                        <Image style={{
                            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                        }} src={heroLeft} alt="" width={580} height={580} className='transform mix-blend-darken' />
                        <div className="absolute inset-0" style={{
                            background: 'radial-gradient(50% 50% at 50% 50%, rgba(152, 38, 38, 0) 48.23%, #982626 99.12%)',
                        }}>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 overflow-hidden">
                    <div className="relative h-auto w-[75vw]">
                        <Image src={heroRight} alt="" style={{ objectFit: 'cover', height: 'auto', width: '100%' }} className='mix-blend-darken' />
                    </div>
                </div>
                <div className="absolute inset-0 z-10">
                    <div className='h-full'>
                        <div className="flex items-center justify-center w-full h-full">
                            <div className="flex flex-col items-center">
                                <div className="max-w-full">
                                    <div className="flex justify-center w-full">
                                        <div className={styles.hu}>
                                            <TheHu />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 text-center">
                                    <div className="max-w-[576px]">
                                        <p className='text-white text-[16px] uppercase'>“A band from <span className='font-bold'>Mongolia</span> that blends the screaming guitars of heavy metal and traditional Mongolian guttural singing,”</p>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <Link href="/ticket">
                                        <button className='uppercase bg-white flex justify-center items-center px-4 py-3 rounded-[500px] text-sm font-bold'>
                                            Buy Early Bird Ticket
                                            <span className="p-2 ml-2 bg-black rounded-full">
                                                <CartSvg />
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='absolute top-0 left-0 right-0 z-20  pt-[60px]'>
                    <div className="flex justify-center w-full">
                        <div className="container">
                            <div className="grid w-full grid-cols-3">
                                <div className="flex justify-start w-full">
                                    <button className="rounded-[500px] border-none px-4 py-3 font-bold h-[48px] bg-black bg-opacity-[0.35] text-white text-opacity-[0.35] uppercase">
                                        Coming Soon
                                    </button>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="flex">
                                        <button className="btn rounded-l-[500px] bg-black bg-opacity-[0.65] cursor-pointer border-none text-sm w-[110px] rounded-r-none">METALAND</button>
                                        <button className="btn rounded-r-[500px] bg-black bg-opacity-[0.65] cursor-pointer border-none text-sm w-[110px] rounded-l-none">ARDCOIN</button>
                                    </div>
                                </div>
                                <div className="flex justify-end w-full">
                                    {isLoggedIn && username ? (
                                        <>
                                            <div className="bg-black rounded-lg dropdown dropdown-down">
                                                <label tabIndex={0} className="text-white btn btn-ghost">
                                                    {username || "User"}
                                                    <div className="w-4 h-4 mx-2 bg-green-400 rounded-full"></div>
                                                    <ChevronDownSvg />
                                                </label>
                                                <ul tabIndex={0} className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                                    <li>
                                                        <Link href="/profile" className="justify-between">
                                                            Profile
                                                        </Link>
                                                    </li>
                                                    <li onClick={() => {
                                                        dispatch(logoutSuccess())
                                                    }}><a>Logout</a></li>
                                                </ul>
                                            </div>
                                        </>
                                    ) : (<></>)}
                                    {!isLoggedIn && !username ? (
                                        <div className="flex justify-between space-x-4">
                                            <button onClick={() => {
                                                dispatch(showAuthModal({
                                                    type: 'login'
                                                }))
                                            }} className="btn border-none hover:bg-white bg-white text-black rounded-[500px]">
                                                Login
                                            </button>
                                            <button onClick={() => {
                                                dispatch(showAuthModal({
                                                    type: 'register'
                                                }))
                                            }} className="btn bg-black bg-opacity-[0.65] rounded-[500px]">
                                                Signup
                                            </button>
                                        </div>
                                    ) : (<></>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className='absolute bottom-0 left-0 right-0 z-30'>
                    <div className='h-[300px] w-full' style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 81.23%)' }}>
                        <div className="flex justify-center w-full h-full">
                            <div className="container h-full">
                                <div className="flex items-end w-full h-full pb-8">
                                    <div className="grid w-full grid-cols-3 gapx-2">
                                        <div className='flex justify-start w-full'>
                                            <div className="flex flex-col items-center pb-10">
                                                <p className="mb-4 font-bold text-white uppercase">Connect with us</p>
                                                <div className="flex space-x-8 jusify-between">
                                                    <span className="cursor-pointer"><MediumSvg /></span>
                                                    <span className="cursor-pointer"><InstagramSvg /></span>
                                                    <span className="cursor-pointer"><FacebookSvg /></span>
                                                    <span className="cursor-pointer"><DiscordSvg /></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-center w-full'>
                                            <div className="flex items-center">
                                                <div className="opacity-[0.65] mr-1"><CopyRightSvg /></div>
                                                <p className="font-medium text-white uppercase text-opacity-[0.65]">2023 THE HU</p>
                                            </div>
                                        </div>
                                        <div className='flex justify-end w-full'>
                                            <div className="flex items-center space-x-4">
                                                <p className="font-medium text-white uppercase text-opacity-[0.65] cursor-pointer">TERMS & CONDITION</p>
                                                <p className="font-medium text-white uppercase text-opacity-[0.65] cursor-pointer">PRIVACY POLICY</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}