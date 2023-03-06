import React, { useRef, useState } from 'react'
import CopyRightSvg from '@/assets/svg/copyright.svg'
import { MdArrowRightAlt } from 'react-icons/md'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logoutSuccess } from '@/store/reducer/auth-reducer/actions'
import { useSwipeable } from 'react-swipeable'
import ArrowRightSvg from './img/arrow-right.svg'

type Props = {
    children: React.ReactNode,
    drawerContent?: React.ReactNode
}

function MobileDrawer({ children, drawerContent }: Props) {

    const drawerRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isAuthLoading = useAppSelector(state => state.auth.isLoading)

    const swipeHandlers = useSwipeable({
        onSwipedRight: () => {
            handleClose()
        },
        onTap: () => {
            console.log('onTap')
        },
        onSwiped: () => {
            console.log('swiped')
        },
        onSwipeStart: () => {
            console.log('swipe start')
        },
        swipeDuration: 1000,
        trackMouse: true,
        trackTouch: true,
        preventScrollOnSwipe: true
    })

    const handleClose = () => {
        if (drawerRef.current?.checked) {
            drawerRef.current?.click()
        }
    }

    return (
        <div className="drawer drawer-end">
            <input ref={drawerRef} id="hu-drawer" type="checkbox" className="drawer-toggle" />
            <div className="overflow-hidden drawer-content">
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="hu-drawer" className="drawer-overlay"></label>
                <div {...swipeHandlers} className='p-4 bg-[#1A1A1A] w-[100%] flex h-full justify-between flex-col'>
                    {drawerContent ? drawerContent : (
                        <div onClick={handleClose} className='flex flex-col justify-between w-full h-full'>
                            <div className="flex flex-col justify-center w-full">
                                <div>
                                    <ul className="w-full space-y-4 rounded-lg menu">
                                        <li>
                                            <a href="https://www.thehuofficial.com" target="_blank" rel="noreferrer" className='flex items-center justify-between w-full text-xl font-bold text-white'>About us <span><ArrowRightSvg size={32} /></span></a>
                                        </li>
                                        <li>
                                            <a href="https://ardcoin.com/" target="_blank" rel="noreferrer" className='flex items-center justify-between w-full text-xl font-bold text-white'>ArdCoin</a>
                                        </li>
                                        <li>
                                            <a href="https://metaland.mn/en" className='flex items-center justify-between w-full text-xl font-bold text-white' target="_blank" rel="noreferrer" >Metaland</a>
                                        </li>
                                        <li>
                                            <Link href="/terms-of-service/en" rel="noreferrer" className='flex items-center justify-between w-full text-xl font-bold text-white'>Help Center</Link>
                                        </li>
                                        {!isAuthLoading && isLoggedIn ? (
                                            <li>
                                                <Link href="/profile" rel="noreferrer" className='flex items-center justify-between w-full text-xl font-bold text-white'>My Profile</Link>
                                            </li>
                                        ) : (<></>)}
                                    </ul>
                                </div>
                            </div>
                            <div className='mt-0'>
                                {!isLoggedIn ? (
                                    <div>
                                        <ul className="w-full rounded-lg menu">
                                            <li>
                                                <Link href="/auth?form=signup" className='flex text-white items-center justify-center w-full bg-white bg-opacity-[0.04] text-sm rounded-xl font-bold' rel="noreferrer" >Signup</Link>
                                            </li>
                                            <li className='mt-2'>
                                                <Link href="/auth?form=login" rel="noreferrer" className='flex font-bold text-sm text-black items-center justify-center w-full bg-white bg-opacity-[0.93] rounded-xl'>Log in</Link>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <div>
                                        <ul className="w-full rounded-lg menu">
                                            <li onClick={() => dispatch(logoutSuccess())} className='mt-2'>
                                                <span className='flex font-bold text-sm text-black items-center justify-center w-full bg-white bg-opacity-[0.93] rounded-xl'>Logout</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MobileDrawer