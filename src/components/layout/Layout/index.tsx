import MobileDrawer from '@/components/drawer/MobileDrawer'
import Footer from '@/components/footer/Footer'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/router'
import React, { useMemo, useEffect } from 'react'

type Props = {
    children: React.ReactNode
}

const HIDE_LAYOUT_ROUTES = [
    '/'
]

function Layout({ children }: Props) {

    const router = useRouter()

    const isLayoutVisible = useMemo(() => {
        return !HIDE_LAYOUT_ROUTES.includes(router.pathname)
    }, [router.pathname, HIDE_LAYOUT_ROUTES])

    useEffect(() => {
        document.querySelector('.drawer-content')?.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [router])


    return (
        <div>
            <MobileDrawer>
                <div>
                    {isLayoutVisible ? (
                        <>
                            <Navbar />
                            <div className='mt-[72px] md:mt-[104px] min-h-[50vh]'>
                                {children}
                            </div>
                            <Footer />
                        </>
                    ) : children}
                </div>
            </MobileDrawer>
        </div>
    )
}

export default Layout