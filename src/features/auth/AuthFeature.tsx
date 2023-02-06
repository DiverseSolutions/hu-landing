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

type Props = {}

type FormType = 'login' | 'register' | 'register-otp' | 'forgot-password' | 'forgot-password-confirm'

const DEFAULT_MODAL = 'login';

export default function AuthFeature({

}: Props) {

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
        try {
            syncSession()
        } catch (e) {
            console.warn('Restore session err:')
            console.warn(e);
        }
    }, [])

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
            dispatch(authNotLoggedIn())
        } else {
            const cognitoUserResp = await callGetUser({
                AccessToken: cognitoAccessToken,
            }).unwrap();
            dispatch(sessionRestored({
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
                                <h2 className='mb-4 text-lg font-bold'>Signup</h2>
                                <SignupForm onSuccess={(d) => {
                                    setFormType('register-otp');
                                    setCurrentUsername(d.username)
                                }} />
                                <div className="mt-2">
                                    <p className="my-4 font-normal text-center">Already have an account?</p>
                                    <div className="flex justify-center w-full">
                                        <button onClick={() => {
                                            setFormType('login')
                                        }} className="btn btn-secondary btn-wide">Login</button>
                                    </div>
                                </div>
                            </>
                        ) : <></>}
                        {formType === 'login' ? (
                            <>
                                <h2 className='mb-4 text-lg font-bold'>Login to an existing account</h2>
                                <LoginForm onSuccess={() => {
                                    hideModal()
                                }} />
                                <div className="mt-2">
                                    <p className="my-4 font-normal text-center">Don&apos;t have an account?</p>
                                    <div className="flex justify-center w-full">
                                        <button onClick={() => {
                                            setFormType('register')
                                        }} className="btn btn-secondary btn-wide">Signup</button>
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    <button onClick={() => {
                                        setFormType('forgot-password')
                                    }} className="mt-2 underline">Forgot password</button>
                                </div>
                            </>
                        ) : <></>}
                        {formType === 'register-otp' ? (
                            <>
                                <h2 className='mb-4 text-lg font-bold'>Confirm Email</h2>
                                <SignupOtpForm username={currentUsername} onSuccess={() => {
                                    hideModal()
                                    setFormType('login')
                                }} />
                            </>
                        ) : (<></>)}
                        {formType === 'forgot-password' ? (
                            <>
                                <h2 className='mb-4 text-lg font-bold'>Forgot Password</h2>
                                <ForgotPasswordForm onSuccess={(v) => {
                                    setCurrentUsername(v)
                                    setFormType('forgot-password-confirm')
                                }} />
                            </>
                        ) : (<></>)}
                        {formType === 'forgot-password-confirm' ? (
                            <>
                                <h2 className='mb-4 text-lg font-bold'>Reset Password</h2>
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