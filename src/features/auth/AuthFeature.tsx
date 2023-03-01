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

type Props = {}

type FormType = 'login' | 'register' | 'register-otp' | 'forgot-password' | 'forgot-password-confirm'

const DEFAULT_MODAL = 'login';

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


    const syncSession = async () => {
        const cognitoIdToken = Cookies.get('cognitoIdToken');
        const cognitoAccessToken = Cookies.get('cognitoAccessToken');
        const ardArtAccessToken = Cookies.get('ardArtAccessToken');
        const ardArtAccountId = Cookies.get('ardArtAccountId');
        if (!cognitoIdToken || !cognitoAccessToken || !ardArtAccessToken || !ardArtAccountId) {
            const idaxExToken = Cookies.get('ex_token') || Cookies.get('token')
            const idaxUserCode = router.query.code as string | undefined || Cookies.get('idax_user_code')
            if (idaxExToken && idaxUserCode) {
                const data = await callIdaxUserInfo()
                if (data.data) {
                    const idaxUserInfo = data.data?.data
                    if (idaxUserInfo) {
                        Cookies.set('idax_user_code', router.query.code as string)
                        dispatch(sessionRestored({
                            session: 'idax-wv',
                            idax: {
                                id: idaxUserInfo.id,
                                code: idaxUserCode,
                                name: idaxUserInfo.nickName,
                                email: idaxUserInfo.email,
                            },
                            profile: {
                                username: idaxUserInfo.nickName,
                                email: idaxUserInfo.email
                            }
                        }))
                        return
                    } else {
                        console.log('idax user not found')
                        console.log(data)
                    }
                }
            } else {
                console.log('not logged in')
                console.log(`ex token: ${idaxExToken}, user code: ${idaxUserCode}`)
                dispatch(authNotLoggedIn())
            }
        } else {
            const cognitoUserResp = await callGetUser({
                AccessToken: cognitoAccessToken,
            }).unwrap();
            dispatch(sessionRestored({
                session: 'web',
                ardArt: {
                    accessToken: {
                        value: ardArtAccessToken,
                    },
                    accountId: {
                        value: parseInt(ardArtAccountId),
                    }
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
            }))
        }
    }

    return (
        <>
            <input ref={authModalRef} type="checkbox" id="auth-modal" className="modal-toggle" onChange={(v) => {
                if (!v.target.checked) {
                    setFormType(DEFAULT_MODAL)
                }
            }} />
            <div className="modal" onClick={() => {
                dispatch(hideAuthModal())
            }}>
                <div className="modal-box" onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <div onClick={hideModal} className='absolute btn-circle btn btn-sm right-2 top-2 '>
                        <MdClose size={24} />
                    </div>
                    <label htmlFor=''></label>
                    <div className='pt-6 mb-4 md:px-8'>
                        {formType === 'register' ? (
                            <>
                                <h2 className='mb-8 text-[32px] font-bold'>Create an account</h2>
                                <SignupForm onSuccess={(d) => {
                                    setFormType('register-otp');
                                    setCurrentUsername(d.username)
                                }} />
                                <div className="flex justify-center w-full mt-6">
                                    <p className="text-center max-w-[276px] text-sm">
                                        <span className='opacity-[0.35]'>By creating an account, I agree to idax</span>
                                        <span className="ml-2 cursor-pointer">terms of service</span>
                                        <span className='opacity-[0.35] ml-2 mr-2'>and</span>
                                        <span className='cursor-pointer'>privacy policy.</span>
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
                                <h2 className='mb-8 text-[32px] font-bold'>Log In</h2>
                                <LoginForm onForgotPassword={() => {
                                    setFormType('forgot-password')
                                }} onSuccess={() => {
                                    hideModal()
                                }} />
                                <div className="flex justify-center w-full mt-6">
                                    <p className="text-center max-w-[276px] text-sm">
                                        <span className='opacity-[0.35]'>By creating an account, I agree to idax</span>
                                        <span className="ml-2 cursor-pointer">terms of service</span>
                                        <span className='opacity-[0.35] ml-2 mr-2'>and</span>
                                        <span className='cursor-pointer'>privacy policy.</span>
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