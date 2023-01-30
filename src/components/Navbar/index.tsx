import Link from 'next/link'
import React, { useState } from 'react'
import AuthFeature from '@/features/auth/AuthFeature'

type Props = {}

export default function Navbar({ }: Props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <>
            <div className="fixed z-50 flex justify-center w-full navbar bg-base-100">
                <div className="container">
                    <div className="flex-1">
                        <Link href="/" className="text-xl normal-case btn btn-ghost">hu.rocks</Link>
                    </div>
                    <div className="flex items-center">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge badge-sm indicator-item">0</span>
                                </div>
                            </label>
                            <div tabIndex={0} className="mt-3 shadow card card-compact dropdown-content w-52 bg-base-100">
                                <div className="card-body">
                                    <span className="text-lg font-bold">0 Items</span>
                                    <span className="">Нийт: 0₮</span>
                                    <div className="card-actions">
                                        <button className="btn btn-primary btn-block">Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isLoggedIn ? (
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </label>
                                <ul tabIndex={0} className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li><a>Logout</a></li>
                                </ul>
                            </div>
                        ) : (
                            <>
                                <label className="ml-2 btn btn-primary btn-wide max-w-[200px]" htmlFor='auth-modal'>
                                    Login
                                </label>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <AuthFeature />
        </>
    )
}