import React from 'react'
import SysReqInfoSvg from './img/sys-req-info.svg'
import SysReqChevron from './img/sys-req-chevron.svg'

type Props = {}

function SystemRequirements({ }: Props) {
    return (
        <div className="flex rounded-xl py-[14px] cursor-pointer px-6 items-center space-x-4 bg-white bg-opacity-[0.04]">
            <SysReqInfoSvg />
            <p className="font-bold text-white">System Requirements</p>
            <SysReqChevron />
        </div>
    )
}

export default SystemRequirements