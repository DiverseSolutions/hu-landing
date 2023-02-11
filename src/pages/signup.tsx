import React from 'react'
import loginLeftImg from '@/assets/img/login-left.jpg'
import Image from 'next/image'
import LoginForm from '@/components/forms/LoginForm'
import { useRouter } from 'next/router'
import Navbar from '@/components/navbar'
import MobileDrawer from '@/components/drawer/MobileDrawer'
import SignupForm from '@/components/forms/SignupForm'

type Props = {}

const SignupPage = (props: Props) => {

    const router = useRouter()

    return (
        <>
            <MobileDrawer>
                <div className="flex w-full">
                    <div className="hidden md:block w-[45%] h-[100vh]">
                        <div className="relative w-full h-full">
                            <Image src={loginLeftImg} fill alt="login" style={{ objectFit: 'cover', mixBlendMode: 'darken' }} />
                            <div className="absolute inset-0" style={{}}></div>
                        </div>
                    </div>
                    <div className="w-full h-[100vh] md:ml-12">
                        <Navbar />
                        <div className="flex items-center justify-center w-full h-full">
                            <div className="md:w-[400px] w-[90vw]">
                                <h4 className='mb-8 text-4xl font-bold'>Sign Up</h4>
                                <SignupForm
                                    onSuccess={() => {
                                        const redirect = `${router.query.redirect || 'profile'}`
                                        if (redirect.startsWith('/')) {
                                            router.push(redirect)
                                        } else {
                                            router.push('/profile')
                                        }
                                    }} />
                            </div>
                        </div>
                    </div>
                </div>
            </MobileDrawer>
        </>
    )
}

export default SignupPage