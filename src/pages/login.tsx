import React from 'react'
import heroLogin from '@/assets/img/hero-login.png'
import LoginTheHuSvg from '@/assets/svg/login-the-hu.svg'
import Image from 'next/image'
import LoginForm from '@/components/forms/LoginForm'

type Props = {}

const LoginPage = (props: Props) => {

    return (
        <>
            <div className="flex w-full">
                <div className="w-[300px] h-[100vh] bg-[#982626]">
                    <div className="relative w-full h-full">
                        <Image src={heroLogin} fill alt="login" style={{ objectFit: 'cover', mixBlendMode: 'darken' }} />
                        <div className="absolute left-0 right-0 top-10">
                            <div className='flex justify-center w-full text-white'>
                                <LoginTheHuSvg />
                            </div>
                        </div>
                        <div className="absolute inset-0" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(152, 38, 38, 0) 60.23%, #982626 180%)' }}></div>
                    </div>
                </div>
                <div className="w-full h-[100vh]">
                    <div className="flex items-center w-full h-full ml-8">
                        <div className="max-w-[376px]">
                            <h4 className='mb-4 text-xl font-bold'>Log In</h4>
                            <LoginForm onSuccess={() => {

                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage