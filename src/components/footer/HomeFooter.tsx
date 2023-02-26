import React from 'react'

import { IoLogoMedium, IoLogoInstagram, IoLogoFacebook, IoLogoDiscord } from 'react-icons/io5'
import { RiCopyrightLine } from 'react-icons/ri'
import CopyRightSvg from '@/assets/svg/copyright.svg'
import classNames from 'classnames'
import Link from 'next/link'

type Props = {}

function HomeFooter({ }: Props) {
    return (
        <div className="flex justify-center w-full pb-8">
            <div className="container text-white">
                <div className="flex flex-col md:grid md:grid-cols-3">
                    <div className="flex justify-center w-full opacity-0 md:justify-start">
                        <div className="flex flex-col justify-between h-full">
                            <span className="mb-6 text-sm font-bold text-center uppercase md:text-left">Connect With Us</span>
                            <div className="grid w-full grid-cols-4 gap-x-6">
                                <IoLogoMedium size={24} color="white" />
                                <IoLogoInstagram size={24} color="white" />
                                <IoLogoFacebook size={24} color="white" />
                                <IoLogoDiscord size={24} color="white" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center w-full mt-8 md:mt-0 md:items-end">
                        <div className="flex items-center">
                            <CopyRightSvg />
                            <span className='opacity-[0.65] text-sm ml-2'>2023 The HU & ARD</span>
                        </div>
                    </div>
                    <div className="flex justify-center w-full mt-8 pointer-events-auto md:mt-0 md:items-end md:justify-end">
                        <Link href="/terms-of-service/en" className={classNames('cursor-pointer text-sm ', { 'opacity-[0.65]': true })}>TERMS & CONDITION</Link>
                        <Link href="/privacy-policy/en" target="_blank" rel="noreferrer" className='text-sm ml-4 cursor-pointer opacity-[0.65]'>PRIVACY POLICY</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HomeFooter