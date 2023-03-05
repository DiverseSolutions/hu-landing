import React from 'react'
import SysReqInfoSvg from './img/sys-req-info.svg'
import SysReqChevron from './img/sys-req-chevron.svg'
import SystemRequirementsContent from '@/components/common/SystemRequirementsContent'

type Props = {}

function SystemRequirementsTransparent({ }: Props) {
    return (
        <div tabIndex={0} className="flex dropdown dropdown-hover dropdown-top md:dropdown-end rounded-xl py-[14px] cursor-pointer px-6 items-center space-x-4 bg-white bg-opacity-[0.04]">
            <SysReqInfoSvg />
            <p className="font-bold text-white">System Requirements</p>
            <SysReqChevron />
            <div tabIndex={0} className="bg-white w-[400px] dropdown-content rounded-xl">
                <SystemRequirementsContent />
            </div>
        </div>
    )
}

export default SystemRequirementsTransparent