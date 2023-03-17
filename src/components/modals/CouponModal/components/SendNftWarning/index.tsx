import React from 'react'

import WarningSvg from './img/warning.svg'


type Props = {}

function SendNftWarning({ }: Props) {
    return (
        <div className="rounded-lg p-4 flex w-full text-sm bg-[#FF8C00] bg-opacity-[0.05]">
            <div><WarningSvg /></div>
            <div className='ml-4'>
                <p>Please insert the email address of the person receiving the NFT. Transfer made to a wrong email address cannot be reversed and we will not be held accountable for the incident.</p>
            </div>
        </div>
    )
}

export default SendNftWarning