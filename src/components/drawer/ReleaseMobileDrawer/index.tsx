import React, { useRef } from 'react'
import CopyRightSvg from '@/assets/svg/copyright.svg'
import { MdArrowRightAlt } from 'react-icons/md'


type Props = {
    children: React.ReactNode,
    drawerContent?: React.ReactNode
}

function ReleaseMobileDrawer({ children, drawerContent }: Props) {

    const drawerRef = useRef<HTMLInputElement>(null)

    return (
        <div className="drawer drawer-end">
            <input ref={drawerRef} id="hu-drawer" type="checkbox" className="drawer-toggle" />
            <div className="relative drawer-content">
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="hu-drawer" className="drawer-overlay"></label>
                <div className='p-4 bg-primary w-[80%] flex h-full justify-between flex-col'>
                    {drawerContent ? drawerContent : (
                        <div>
                            <div className="flex flex-col justify-center w-full">
                                <div>
                                    <ul className="w-full rounded-lg menu bg-secondary text-secondary-content">
                                        <li><a href="https://metaland.mn/en" className='flex items-center justify-between w-full' target="_blank" rel="noreferrer" >METALAND <span><MdArrowRightAlt size={32} /></span></a>
                                        </li>
                                        <li><a href="https://ardcoin.com/" target="_blank" rel="noreferrer" className='flex items-center justify-between w-full'>ARDCOIN <span><MdArrowRightAlt size={32} /></span></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex justify-center w-full align-bottom">
                                <div className='flex justify-center w-full'>
                                    <div className="flex items-center">
                                        <div className="mr-1 "><CopyRightSvg /></div>
                                        <p className="font-medium text-white uppercase">2023 The HU & Ard</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReleaseMobileDrawer