import React, { useState } from 'react'
import SysReqInfoSvg from './img/sys-req-info.svg'
import SysReqChevron from './img/sys-req-chevron.svg'
import classNames from 'classnames'
import SystemRequirementsContent from '../SystemRequirementsContent'

type Props = {}

function SystemRequirementsDropdown({ }: Props) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div onClick={() => {
            setIsOpen(!isOpen)
        }} className="flex dropdown dropdown-hover dropdown-bottom dropdown-end rounded-xl py-[14px] cursor-pointer px-6 items-center bg-black bg-opacity-[0.04]">
            <SysReqInfoSvg />
            <p className="ml-6 mr-8 font-bold text-black">System Requirements</p>
            <span tabIndex={0} className={classNames(
                'transition-all duration-100',
                {
                    'transform rotate-180': isOpen,
                })}><SysReqChevron /></span>
            <div tabIndex={0} className="bg-white w-[400px] dropdown-content">
                <SystemRequirementsContent />
            </div>
        </div >
    )
}

export default SystemRequirementsDropdown