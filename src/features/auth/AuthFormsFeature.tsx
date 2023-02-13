import React, { useEffect, useState } from 'react'
import loginLeftImg from '@/assets/img/login-left.jpg'
import Image from 'next/image'
import LoginForm from '@/components/forms/LoginForm'
import { useRouter } from 'next/router'
import SignupOtpForm from '@/components/forms/SignupOtpForm'
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm'
import ForgotPasswordConfirmForm from '@/components/forms/ForgotPasswordConfirmForm'
import SignupForm from '@/components/forms/SignupForm'

type Props = {}

type FormType = 'login' | 'signup' | 'signup-otp' | 'forgot-password' | 'forgot-password-confirm'

const AuthFormsFeature = (props: Props) => {

    const router = useRouter()
    const [formType, setFormType] = useState<FormType>()
    const [currentUsername, setCurrentUsername] = useState('')

    useEffect(() => {
        if (router.query.form) {
            setFormType((router.query.form || 'login') as FormType)
        } else {
            setFormType('login')
        }
    }, [router.query])

    const handleAuthSuccess = () => {
        const redirect = `${router.query.redirect || '/profile'}`
        if (redirect.startsWith('/')) {
            router.push(redirect)
        } else {
            router.push('/profile')
        }
    }

    return (
        <>
            <div className="flex w-full overflow-y-hidden">
                <div className="hidden md:block w-[50%]" style={{
                    height: `calc(100vh - 100px)`
                }}>
                    <div className="relative w-full h-full min-h-[700px]">
                        <Image src={loginLeftImg} fill alt="login" style={{ objectFit: 'cover', mixBlendMode: 'darken' }} />
                        <div className="absolute inset-0"></div>
                    </div>
                </div>
                <div className="w-full md:ml-12 h-[calc(100vh - 100px)]" style={{
                    height: `calc(100vh - 100px)`
                }}>
                    <div className='h-full px-6 pt-6 mb-4 overflow-y-auto md:px-8'>
                        <div className="flex items-center justify-center w-full h-full min-h-[700px]">
                            <div className="w-[90vw] md:w-[500px]">
                                {formType === 'signup' ? (
                                    <>
                                        <h2 className='mb-8 text-[32px] font-bold'>Create an account</h2>
                                        <SignupForm onSuccess={(d) => {
                                            setFormType('signup-otp');
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
                                            handleAuthSuccess()
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
                                                setFormType('signup')
                                            }} className="my-4 font-normal text-center text-black">
                                                <span className='opacity-[0.35]'>Don&apos;t have an account?</span>
                                                <span className="ml-2 underline">Signup</span>
                                            </p>
                                        </div>
                                    </>
                                ) : <></>}
                                {formType === 'signup-otp' ? (
                                    <>
                                        <h2 className='mb-8 text-[32px] font-bold'>Confirm Email</h2>
                                        <SignupOtpForm username={currentUsername} onSuccess={() => {
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
                                            setFormType('login')
                                        }} />
                                    </>
                                ) : (<></>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthFormsFeature