import React, { useRef } from 'react'
import CopyRightSvg from '@/assets/svg/copyright.svg'
import { MdArrowRightAlt } from 'react-icons/md'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logoutSuccess } from '@/store/reducer/auth-reducer/actions'


type Props = {
    children: React.ReactNode,
    drawerContent?: React.ReactNode
}

function MobileDrawer({ children, drawerContent }: Props) {

    const drawerRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isAuthLoading = useAppSelector(state => state.auth.isLoading)

    return (
        <div className="drawer drawer-end">
            <input ref={drawerRef} id="hu-drawer" type="checkbox" className="drawer-toggle" />
            <div className="overflow-hidden drawer-content">
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="hu-drawer" className="drawer-overlay"></label>
                <div className='p-4 bg-primary w-[80%] flex h-full justify-between flex-col'>
                    {drawerContent ? drawerContent : (
                        <div className='flex flex-col justify-between w-full h-full'>
                            <div className="flex flex-col justify-center w-full">
                                <div className='mt-0'>
                                    {!isLoggedIn ? (
                                        <div>
                                            <ul className="w-full rounded-lg menu bg-secondary text-secondary-content">
                                                <li><Link href="/auth?form=login" className='flex items-center justify-between w-full' rel="noreferrer" >Login <span><MdArrowRightAlt size={32} /></span></Link>
                                                </li>
                                                <li><Link href="/auth?form=signup" rel="noreferrer" className='flex items-center justify-between w-full'>Sign Up <span><MdArrowRightAlt size={32} /></span></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    ) : (<></>)}
                                </div>
                                {!isAuthLoading && isLoggedIn ? (
                                    <div className='mt-8'>
                                        <ul className="w-full rounded-lg menu bg-secondary text-secondary-content">
                                            <li><Link href="/profile" className='flex items-center justify-between w-full' target="_blank" rel="noreferrer" >Profile <span><MdArrowRightAlt size={32} /></span></Link>
                                            </li>
                                            <li><button onClick={() => {
                                                dispatch(logoutSuccess())
                                            }} className='flex items-center justify-between w-full'  >Logout <span><MdArrowRightAlt size={32} /></span></button>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (<></>)}
                                <div className='mt-8'>
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
                    )}
                </div>
            </div>
        </div>
    )
}

export default MobileDrawer