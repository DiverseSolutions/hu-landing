import React, { useEffect, useState } from 'react'
import Navbar from '@/components/navbar'
import MobileDrawer from '@/components/drawer/MobileDrawer'
import Footer from '@/components/footer/Footer'
import AuthFormsFeature from '@/features/auth/AuthFormsFeature'

type Props = {}


const AuthPage = (props: Props) => {

    return (
        <>
            <MobileDrawer>
                <Navbar />
                <AuthFormsFeature />
            </MobileDrawer>
        </>
    )
}

export default AuthPage