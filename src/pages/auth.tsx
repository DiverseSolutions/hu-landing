import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import MobileDrawer from '@/components/drawer/MobileDrawer'
import Footer from '@/components/footer/Footer'
import AuthFormsFeature from '@/features/auth/AuthFormsFeature'

type Props = {}


const AuthPage = (props: Props) => {

    return (
        <>
            <AuthFormsFeature />
        </>
    )
}

export default AuthPage