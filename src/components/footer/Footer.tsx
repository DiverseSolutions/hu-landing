import React from 'react'

import { IoLogoMedium, IoLogoInstagram, IoLogoFacebook, IoLogoDiscord } from 'react-icons/io5'
import { RiCopyrightLine } from 'react-icons/ri'

type Props = {}

function Footer({ }: Props) {
    return (
        <div className="flex justify-center w-full pt-12 pb-12">
            <div className="container">
                <div className="flex flex-col md:grid md:grid-cols-3">
                    <div className="flex justify-center w-full opacity-0 md:justify-start">
                        <div className="flex flex-col justify-between h-full">
                            <span className="mb-6 text-sm font-bold text-center uppercase md:text-left">Connect With Us</span>
                            <div className="grid w-full grid-cols-4 gap-x-6">
                                <IoLogoMedium size={24} />
                                <IoLogoInstagram size={24} />
                                <IoLogoFacebook size={24} />
                                <IoLogoDiscord size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center w-full mt-8 md:mt-0 md:items-end">
                        <div className="flex items-center">
                            <RiCopyrightLine />
                            <span className='opacity-[0.65] text-sm ml-2 text-black'>2023 The HU & ARD</span>
                        </div>
                    </div>
                    <div className="flex justify-center w-full mt-8 opacity-0 md:mt-0 md:items-end md:justify-end">
                        <span className='cursor-pointer text-sm opacity-[0.65]'>TERMS & CONDITION</span>
                        <span className='text-sm ml-4 cursor-pointer opacity-[0.65]'>PRIVACY POLICY</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer