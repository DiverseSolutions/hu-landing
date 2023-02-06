import React, { Suspense, useState, useEffect, useMemo } from 'react'

import TheHu from '@/components/icon/svgr/TheHu'
import InTheMetaverse from '@/components/icon/svgr/InTheMetaverse'
import MediumSvg from '@/assets/svg/medium.svg'
import InstagramSvg from '@/assets/svg/instagram.svg'
import FacebookSvg from '@/assets/svg/facebook.svg'
import DiscordSvg from '@/assets/svg/discord.svg'
import heroLeft from '@/assets/img/hero-left.png'
import CopyRightSvg from '@/assets/svg/copyright.svg'
import ChevronDownSvg from '@/assets/svg/chevron-down.svg'
import heroRight from '@/assets/img/hero-right.png'
import heroRightMobile from '@/assets/img/hero-right-mobile.png'
import { MdArrowRightAlt } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logoutSuccess, showAuthModal } from '@/store/reducer/auth-reducer/actions'
import useWindowResize from 'beautiful-react-hooks/useWindowResize'
import MobileDrawer from '@/components/drawer/MobileDrawer'
import { BiMenuAltRight } from 'react-icons/bi'

type Props = {}

function TheHuResponsive() {
    const [sw, setSw] = useState<number>(1500);
    const onWindowSize = useWindowResize()

    useEffect(() => {
        setSw(window.innerWidth)
    }, [])

    onWindowSize(() => {
        setSw(window.innerWidth)
    })

    const height = useMemo(() => {
        if (!sw || sw > 1384) {
            return 193
        }
        return Math.max(193 * sw / 1384 * 0.8, 20)
    }, [sw])

    if (!sw) {
        return <></>
    }

    return (
        <div className="flex items-center justify-center w-full mt-8" style={{
            height,
        }}>
            <TheHu style={{
                transform: `scale(${sw > 1384 ? 1 : sw / 1384 * 0.8})`
            }} />
        </div>
    )
}

function InTheMetaverseResponsive() {

    const [sw, setSw] = useState<number>(1500);
    const onWindowSize = useWindowResize()

    useEffect(() => {
        setSw(window.innerWidth)
    }, [])

    onWindowSize(() => {
        setSw(window.innerWidth)
    })

    const height = useMemo(() => {
        if (!sw || sw > 1384) {
            return 24
        }
        return Math.max(sw > 1384 ? 1 : 24 * sw / 1384 * 0.8, 12)
    }, [sw])

    if (!sw) {
        return <></>
    }

    return (
        <div className="flex items-center justify-center w-full" style={{
            height,
        }}>
            <InTheMetaverse style={{
                transform: `scale(${sw > 1384 ? 1 : Math.max(sw / 1384 * 0.8, 0.5)})`
            }} />
        </div>
    )
}

export default function ReleaseLandingWithComingSoon({ }: Props) {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const username = useAppSelector(state => state.auth.profile?.username)

    return (
        <>
            <MobileDrawer drawerContent={(
                <div className='p-4 bg-primary w-[80%] flex h-full justify-between flex-col'>
                    <div className="flex flex-col justify-center w-full">
                        <div>
                            <ul className="w-full rounded-lg menu bg-secondary text-secondary-content">
                                <li><a href="https://metaland.mn/en" className='flex items-center justify-between w-full' target="_blank" rel="noreferrer" >METALAND <span><MdArrowRightAlt size={32} /></span></a>
                                </li>
                                <li><a href="https://ardcoin.com/" target="_blank" rel="noreferrer" className='flex items-center justify-between w-full'>ARDCOIN <span><MdArrowRightAlt size={32} /></span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex justify-center w-full align-bottom">
                        <div className='flex justify-center w-full'>
                            <div className="flex items-center">
                                <div className="mr-1 "><CopyRightSvg /></div>
                                <p className="font-medium text-white uppercase">2023 THE HU</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}>
                <div className='h-[100vh] bg-[#982626] relative md:overflow-hidden overflow-x-hidden overflow-y-auto'>
                    <div className="absolute top-0">
                        <div className="relative">
                            <Image style={{
                                filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                            }} src={heroLeft} alt="" width={580} height={580} className='hidden transform mix-blend-darken md:block' />
                            <div className="absolute inset-0" style={{
                                background: 'radial-gradient(50% 50% at 50% 50%, rgba(152, 38, 38, 0) 48.23%, #982626 99.12%)',
                            }}>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 overflow-hidden">
                        <img src={heroRight.src} alt=""
                            className='hidden object-cover w-auto h-screen mix-blend-darken md:w-auto md:h-screen md:block' />
                        <img src={heroRightMobile.src} alt="" className='object-cover w-auto h-screen mix-blend-darken md:w-auto md:h-screen md:hidden' />
                    </div>
                    <div className="absolute inset-0 z-30">
                        <div className='h-full'>
                            <div className="flex items-center justify-center w-full h-full">
                                <div className="relative flex flex-col items-center">
                                    <div className="max-w-full">
                                        <div><p className="text-lg font-bold text-center text-white uppercase md:text-4xl">Coming Soon</p></div>
                                        <Suspense>
                                            <TheHuResponsive />
                                        </Suspense>
                                    </div>
                                    <div className="mt-8 text-center">
                                        <div className="md:max-w-[576px] max-w-[80vw]">
                                            <p className='text-white text-[20px] uppercase break-normal break-words'>IN THE METAVERSE
                                                Early bird ticket for Rumble of Thunder V1.1 on 13 February, 2023</p>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        {/* <Link href="/early">
                                        <button className='uppercase bg-white flex justify-center items-center px-4 py-3 rounded-[500px] text-sm font-bold'>
                                            Buy Early Bird Ticket
                                            <span className="p-2 ml-2 bg-black rounded-full">
                                                <CartSvg />
                                            </span>
                                        </button>
                                    </Link> */}
                                        <button onClick={() => {

                                        }} className="btn btn-disabled text-white text-base text-opacity-[0.35] rounded-lg bg-black bg-opacity-[0.35] btn-wide font-bold md:min-w-[330px]">PURCHASE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='absolute top-0 left-0 right-0 z-30 pt-[1rem] md:pt-[60px]'>
                        <div className="flex justify-center w-full">
                            <div className="container">
                                <div className='flex justify-end w-full md:hidden'>
                                    <div className="flex mr-2">
                                        <div className="flex justify-end"><label htmlFor="hu-drawer"><BiMenuAltRight size={48} color="white" /></label></div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-between md:mt-0 mt-[1rem] px-2 md:px-0">
                                    <div className="items-center justify-center hidden md:flex">
                                        <div className="flex">
                                            <a href="https://metaland.mn/en" target="_blank" rel="noreferrer" className="btn rounded-l-[500px] bg-black bg-opacity-[0.65] cursor-pointer border-none text-sm w-[110px] rounded-r-none">METALAND</a>
                                            <a href="https://ardcoin.com/" target="_blank" rel="noreferrer" className="btn rounded-r-[500px] bg-black bg-opacity-[0.65] cursor-pointer border-none text-sm w-[110px] rounded-l-none">ARDCOIN</a>
                                        </div>
                                    </div>
                                    <div className="flex justify-end w-full">
                                        {isLoggedIn && username ? (
                                            <>
                                                <div className="bg-black rounded-lg dropdown dropdown-end">
                                                    <label tabIndex={0} className="text-white btn btn-ghost">
                                                        {username || "User"}
                                                        <div className="w-4 h-4 mx-2 bg-green-400 rounded-full"></div>
                                                        <ChevronDownSvg />
                                                    </label>
                                                    <ul tabIndex={0} className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                                        <li>
                                                            <Link href="/profile" className="justify-between p-0">
                                                                <span className="w-full h-full p-4">Profile</span>
                                                            </Link>
                                                        </li>
                                                        <li onClick={() => {
                                                            dispatch(logoutSuccess())
                                                        }}><span className='p-4'>Logout</span></li>
                                                    </ul>
                                                </div>
                                            </>
                                        ) : (<></>)}
                                        {!isLoggedIn && !username ? (
                                            <div className="justify-between hidden space-x-4 md:flex">
                                                <button onClick={() => {
                                                    // dispatch(showAuthModal({
                                                    //     type: 'login'
                                                    // }))
                                                }} className="btn btn-disabled border-none hover:bg-white bg-white text-black rounded-[500px]">
                                                    Login
                                                </button>
                                                <button onClick={() => {
                                                    // dispatch(showAuthModal({
                                                    //     type: 'register'
                                                    // }))
                                                }} className="btn btn-disabled text-white bg-black bg-opacity-[0.65] rounded-[500px]">
                                                    Sign Up
                                                </button>
                                            </div>
                                        ) : (<></>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 z-10">
                        <div className="h-[300px] w-full" >

                        </div>
                    </div>
                    <footer className='absolute bottom-0 left-0 right-0 z-50'>
                        <div className='relative w-full'>
                            <div className="flex justify-center w-full h-full">
                                <div className="container h-full">
                                    <div className="flex items-end w-full h-full pb-8">
                                        <div className="flex-col items-center w-full md:grid md:grid-cols-3 md:gap-x-2">
                                            <div className='flex justify-center w-full md:justify-start'>
                                                <div className="flex flex-col items-center pb-10">
                                                    <p className="hidden mb-4 font-bold text-white uppercase">Connect with us</p>
                                                    <div className="hidden space-x-8 jusify-between">
                                                        <span className="cursor-pointer"><MediumSvg /></span>
                                                        <span className="cursor-pointer"><InstagramSvg /></span>
                                                        <span className="cursor-pointer"><FacebookSvg /></span>
                                                        <span className="cursor-pointer"><DiscordSvg /></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex justify-center w-full'>
                                                <div className="flex items-center">
                                                    <div className="mr-1 "><CopyRightSvg /></div>
                                                    <p className="font-medium text-white uppercase">2023 THE HU</p>
                                                </div>
                                            </div>
                                            <div className='items-center justify-center hidden w-full md:justify-end'>
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
            </MobileDrawer>
        </>
    )
}