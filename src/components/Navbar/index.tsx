import Link from 'next/link'
import React, { useState } from 'react'
import AuthFeature from '@/features/auth/AuthFeature'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { ClipLoader } from 'react-spinners'
import { logoutSuccess, showAuthModal } from '@/store/reducer/auth-reducer/actions'

type Props = {}

export default function Navbar({ }: Props) {

    const dispatch = useAppDispatch()
    const isAuthLoading = useAppSelector(state => state.auth.isLoading)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const profile = useAppSelector(state => state.auth.profile)

    return (
        <>
            <div className="z-50 flex justify-center w-full navbar bg-base-100">
                <div className="container">
                    <div className="flex-1">
                        <Link href="/" className="text-xl normal-case btn btn-ghost">hu.rocks</Link>
                    </div>
                    <div className="flex items-center">
                        <div className="mr-4 dropdown dropdown-end">
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
                            <div className="dropdown dropdown-left">
                                <label tabIndex={0} className="ml-4 btn btn-ghost btn-circle avatar">
                                    {profile.username || profile.email || "User"}
                                </label>
                                <ul tabIndex={0} className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <Link href="/profile" className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li onClick={() => {
                                        dispatch(logoutSuccess())
                                    }}><a>Logout</a></li>
                                </ul>
                            </div>
                        ) : (
                            <>
                            </>
                        )}
                        {!isAuthLoading && !isLoggedIn ? (
                            <>
                                <label onClick={() => {
                                    dispatch(showAuthModal())
                                }} className="ml-2 btn btn-primary btn-wide max-w-[200px]">
                                    Login
                                </label>
                            </>
                        ) : (<></>)}
                    </div>
                </div>
            </div>
            <AuthFeature />
        </>
    )
}