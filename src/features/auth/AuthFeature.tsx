import ForgotPasswordConfirmForm from '@/components/forms/ForgotPasswordConfirmForm'
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm'
import LoginForm from '@/components/forms/LoginForm'
import SignupForm from '@/components/forms/SignupForm'
import SignupOtpForm from '@/components/forms/SignupOtpForm'
import React, { useState, useEffect, useRef } from 'react'
import { MdClose } from 'react-icons/md'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { authNotLoggedIn, hideAuthModal, sessionRestored } from '@/store/reducer/auth-reducer/actions'
import { useLazyGetUserQuery } from '@/store/rtk-query/cognito/cognito-api'
import { useLazyIdaxUserInfoQuery } from '@/store/rtk-query/idax/idax-api'
import { useRouter } from 'next/router'
import AuthCloseSvg from '@/assets/svg/auth-close.svg'
import Link from 'next/link'
import { useSwipeable } from 'react-swipeable'
import { getIdaxCookie } from '@/lib/cookie'

type Props = {}

type FormType = 'login' | 'register' | 'register-otp' | 'forgot-password' | 'forgot-password-confirm'

const DEFAULT_MODAL = 'login';

type IdaxUserData = {
    id: number;
    emailMasked: string;
    nickName: string;
}

export default function AuthFeature({

}: Props) {

    const router = useRouter()
    const [callIdaxUserInfo] = useLazyIdaxUserInfoQuery()
    const authModal = useAppSelector(state => state.auth.authModal)
    const [callGetUser] = useLazyGetUserQuery()
    const dispatch = useAppDispatch()
    const [formType, setFormType] = useState<FormType>(DEFAULT_MODAL)
    const [currentUsername, setCurrentUsername] = useState('')

    const authModalRef = useRef<HTMLInputElement>(null)

    const hideModal = () => {
        dispatch(hideAuthModal())
    }

    useEffect(() => {
        if (!router.isReady) {
            return
        }
        try {
            syncSession()
        } catch (e) {
            console.warn('Restore session err:')
            console.warn(e);
        }
    }, [router.isReady])

    useEffect(() => {
        if (authModal) {
            setFormType(authModal)
            if (!authModalRef.current?.checked) {
                authModalRef.current?.click();
            }
        } else {
            if (authModalRef.current?.checked) {
                authModalRef.current?.click();
            }
        }
    }, [authModal])

    const swipeHandlers = useSwipeable({
        onSwipedRight: () => {
            hideModal()
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

    const syncSession = async () => {
        let idaxUserData: IdaxUserData | null = null
        const {
            idaxExToken,
        } = getIdaxCookie()
        if (idaxExToken) {
            const data = await callIdaxUserInfo()
            if (data.data) {
                const idaxUserInfo = data.data?.data
                if (idaxUserInfo) {
                    idaxUserData = {
                        id: idaxUserInfo.id,
                        emailMasked: idaxUserInfo.email,
                        nickName: idaxUserInfo.nickName,
                    }
                }
            }
        }
        const cognitoIdToken = Cookies.get('cognitoIdToken');
        const cognitoAccessToken = Cookies.get('cognitoAccessToken');
        const ardArtAccessToken = Cookies.get('ardArtAccessToken');
        const ardArtAccountId = Cookies.get('ardArtAccountId');
        if (cognitoIdToken && cognitoAccessToken && ardArtAccessToken && ardArtAccountId) {
            const cognitoUserResp = await callGetUser({
                AccessToken: cognitoAccessToken,
            }).unwrap();
            dispatch(sessionRestored({
                session: idaxUserData ? 'idax-wv' : 'web',
                ardArt: {
                    accessToken: {
                        value: ardArtAccessToken,
                    },
                    accountId: {
                        value: parseInt(ardArtAccountId),
                    },
                },
                cognito: {
                    idToken: {
                        value: cognitoIdToken,
                    },
                    accessToken: {
                        value: cognitoAccessToken,
                    },
                },
                profile: {
                    email: cognitoUserResp.UserAttributes.find((a) => a.Name === 'email')!.Value,
                    username: cognitoUserResp.Username,
                },
                ...(idaxUserData ? {
                    idax: {
                        id: idaxUserData.id,
                        email: idaxUserData.emailMasked,
                        name: idaxUserData.nickName,
                    }
                } : {})
            }))
        }
        if (!ardArtAccessToken) {
            dispatch(authNotLoggedIn())
        }
    }

    return (
        <>
            <input ref={authModalRef} type="checkbox" id="auth-modal" className="modal-toggle" onChange={(v) => {
                if (!v.target.checked) {
                    setFormType(DEFAULT_MODAL)
                }
            }} />
            <div className="modal backdrop-blur-[7.5px] bg-black bg-opacity-[0.4]" onClick={() => {
                dispatch(hideAuthModal())
            }}>
                <div {...swipeHandlers} className="px-6 modal-box rounded-xl" onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <div className="flex">
                        <div onClick={hideModal} className='flex p-3 cursor-pointer rounded-xl bg-black bg-opacity-[0.04]'>
                            <AuthCloseSvg />
                        </div>
                    </div>
                    <label htmlFor=''></label>
                    <div className='mt-6'>
                        {formType === 'register' ? (
                            <>
                                <h2 className='mb-8 text-[32px] font-bold'>Create an account</h2>
                                <SignupForm onSuccess={(d) => {
                                    setFormType('register-otp');
                                    setCurrentUsername(d.username)
                                }} />
                                <div className="flex justify-center w-full mt-6">
                                    <p className="text-center max-w-[276px] text-sm">
                                        <span className='opacity-[0.35]'>By creating an account, I agree to</span>
                                        <Link href="/terms-of-service/en" target="_blank" rel="noreferrer" className="ml-2 cursor-pointer">terms of service</Link>
                                        <span className='opacity-[0.35] ml-2 mr-2'>and</span>
                                        <Link href="/privacy-policy/en" target="_blank" rel="noreferrer" className='cursor-pointer'>privacy policy.</Link>
                                    </p>
                                </div>
                                <div className="mt-6 cursor-pointer">
                                    <p onClick={() => {
                                        setFormType('login')
                                    }} className="my-4 font-normal text-center text-black">
                                        <span className='opacity-[0.35]'>Already have an account?</span>
                                        <span className="ml-2 underline">Login</span>
                                    </p>
                                </div>
                            </>
                        ) : <></>}
                        {formType === 'login' ? (
                            <>
                                <h2 className='mb-8 text-[32px] font-bold'>Log in</h2>
                                <LoginForm onForgotPassword={() => {
                                    setFormType('forgot-password')
                                }} onSuccess={() => {
                                    hideModal()
                                }} />
                                <div className="flex justify-center w-full mt-6">
                                    <p className="text-center max-w-[276px] text-sm">
                                        <span className='opacity-[0.35]'>By creating an account, I agree to</span>
                                        <Link href="/terms-of-service/en" target="_blank" rel="noreferrer" className="ml-2 cursor-pointer">terms of service</Link>
                                        <span className='opacity-[0.35] ml-2 mr-2'>and</span>
                                        <Link href="/privacy-policy/en" target="_blank" rel="noreferrer" className='cursor-pointer'>privacy policy.</Link>
                                    </p>
                                </div>
                                <div className="mt-6 cursor-pointer">
                                    <p onClick={() => {
                                        setFormType('register')
                                    }} className="my-4 font-normal text-center text-black">
                                        <span className='opacity-[0.35]'>Don&apos;t have an account?</span>
                                        <span className="ml-2 underline">Signup</span>
                                    </p>
                                </div>
                            </>
                        ) : <></>}
                        {formType === 'register-otp' ? (
                            <>
                                <h2 className='mb-8 text-[32px] font-bold'>Confirm Email</h2>
                                <SignupOtpForm username={currentUsername} onSuccess={() => {
                                    hideModal()
                                    setFormType('login')
                                }} />
                            </>
                        ) : (<></>)}
                        {formType === 'forgot-password' ? (
                            <>
                                <h2 className='mb-8 text-[32px] font-bold'>Forgot Password</h2>
                                <ForgotPasswordForm onSuccess={(v) => {
                                    setCurrentUsername(v)
                                    setFormType('forgot-password-confirm')
                                }} />
                            </>
                        ) : (<></>)}
                        {formType === 'forgot-password-confirm' ? (
                            <>
                                <h2 className='mb-8 text-[32px] font-bold'>Reset Password</h2>
                                <ForgotPasswordConfirmForm username={currentUsername} onSuccess={() => {
                                    hideModal()
                                }} />
                            </>
                        ) : (<></>)}
                    </div>
                </div>
            </div>
        </>
    )
}