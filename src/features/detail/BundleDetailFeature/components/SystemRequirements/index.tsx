import React from 'react'
import SysReqInfoSvg from './img/sys-req-info.svg'
import SysReqChevron from './img/sys-req-chevron.svg'

type Props = {}

function SystemRequirements({ }: Props) {
    return (
        <div className="flex basis-auto shrink grow-0 rounded-xl py-[14px] cursor-pointer px-6 bg-black items-center bg-opacity-[0.04]">
            <SysReqInfoSvg />
            <p className="ml-6 mr-8 font-bold text-black">System Requirements</p>
            <SysReqChevron />
        </div>
    )
}

export default SystemRequirements