import Footer from '@/components/footer/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

type Props = {}

function TermsOfServiceEN({ }: Props) {
    return (
        <>
            <Navbar />
            <div className="h-[100px] w-full" style={{
                background: `radial-gradient(105.33% 76.33% at 50% 95.88%, #721C1C 0.01%, rgba(0, 0, 0, 0) 100%)`,
                backgroundColor: 'black'
            }}>
                <div className="flex items-center justify-center w-full h-full">
                    <p className="text-4xl text-center text-white">
                        Law enforcement
                    </p>
                </div>
                <div className="mt-8">
                    <div className="flex justify-center w-full">
                        <div className="md:max-w-[800px] w-full md:px-0 px-8">
                            <p className="text-4xl">
                                Terms of Service
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default TermsOfServiceEN