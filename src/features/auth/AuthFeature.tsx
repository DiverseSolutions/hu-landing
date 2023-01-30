import ForgotPasswordConfirmForm from '@/components/forms/ForgotPasswordConfirmForm'
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm'
import LoginForm from '@/components/forms/LoginForm'
import SignupForm from '@/components/forms/SignupForm'
import SignupOtpForm from '@/components/forms/SignupOtpForm'
import React, { useState } from 'react'

type Props = {}

type FormType = 'login' | 'register' | 'register-otp' | 'forgot-password' | 'forgot-password-confirm'

const DEFAULT_MODAL = 'login';

export default function AuthFeature({

}: Props) {
    const [formType, setFormType] = useState<FormType>(DEFAULT_MODAL)
    const [currentUsername, setCurrentUsername] = useState('')

    const hideModal = () => {
        document.getElementById('auth-modal')?.click();
    }

    return (
        <>
            <input type="checkbox" id="auth-modal" className="modal-toggle" onChange={(v) => {
                if (!v.target.checked) {
                    setFormType(DEFAULT_MODAL)
                }
            }} />
            <div className="modal">
                <div className="modal-box">
                    <label htmlFor="auth-modal" className="absolute btn btn-sm btn-circle right-2 top-2">✕</label>
                    <label htmlFor=''></label>
                    <div className='px-8 pt-6 mb-4'>
                        {formType === 'register' ? (
                            <>
                                <h2 className='mb-4 text-lg font-bold'>Create an account</h2>
                                <SignupForm onSuccess={(d) => {
                                    setFormType('register-otp');
                                    setCurrentUsername(d.username)
                                }} />
                                <div className="mt-2">
                                    <p className="my-4 font-normal text-center">Already registered?</p>
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
                                <LoginForm />
                                <div className="mt-2">
                                    <p className="my-4 font-normal text-center">Don't have an account?</p>
                                    <div className="flex justify-center w-full">
                                        <button onClick={() => {
                                            setFormType('register')
                                        }} className="btn btn-secondary btn-wide">Register</button>
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

                                }} />
                            </>
                        ) : (<></>)}
                    </div>
                </div>
            </div>
        </>
    )
}