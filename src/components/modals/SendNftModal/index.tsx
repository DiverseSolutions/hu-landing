import { ArdArtMyOwnedNftRecord } from '@/store/rtk-query/hux-ard-art/types'
import { GrClose } from 'react-icons/gr'
import React, { useRef, useState } from 'react'
import { formatPrice } from '@/lib/utils'
import { useArdxUsdRateQuery, useUsdToArdxRateQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { ClipLoader } from 'react-spinners'
import SendNftEmailForm from '@/components/forms/SendNftEmailForm'

type Props = {
    nft: ArdArtMyOwnedNftRecord | undefined,
    onClose: () => void
}

function SendNftModal({ onClose, nft }: Props) {

    const sendNftModalRef = useRef<HTMLInputElement>(null)

    const { data: usdArdx, isLoading: isRateLoading } = useUsdToArdxRateQuery()

    const [email, setEmail] = useState<string>()

    const handleClose = () => {
        if (sendNftModalRef.current?.checked) {
            sendNftModalRef.current.click()
            onClose()
        }
    }

    return (
        <>
            <input ref={sendNftModalRef} type="checkbox" id="send-nft-modal" className="modal-toggle" onChange={(v) => {
                if (!v.target.checked) {
                    // setFormType(DEFAULT_MODAL)
                }
            }} />
            {nft ? (<div className="modal backdrop-blur-[7.5px] bg-black bg-opacity-[0.4]" onClick={handleClose}>
                <div className="modal-box max-w-[400px] rounded-xl" onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <span className='cursor-pointer' onClick={handleClose}>
                        <GrClose size={16} />
                    </span>
                    <div className="mt-8">
                        <p className='font-bold text-[#272937] text-[24px]'>Send NFT</p>
                        {nft.name}
                    </div>
                    <div className="mt-6">
                        <div className="flex items-start">
                            <img src={nft.imageUrl} className="w-[72px] h-auto object-cover rounded-lg" />
                            <div className="flex flex-col ml-4">
                                <p className='text-opacity-[0.65] text-black text-xs font-light'>Powered by ARD & Metaforce</p>
                                <p className='text-base font-light text-black text-opacity-[0.93]'>{nft.name}</p>
                                <div className="mt-2">
                                    <span className="text-base font-bold">${formatPrice(nft.price)}</span>
                                    {!usdArdx ? (<ClipLoader size={12} />) : (
                                        <span className="ml-[6px] text-xs py-1 px-2 font-light bg-black bg-opacity-[0.04] rounded-sm">
                                            {formatPrice(nft.price * usdArdx)} ARDX
                                        </span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <SendNftEmailForm onSubmit={(v) => {

                        }} />
                    </div>
                </div>
            </div>) : <></>}
        </>
    )
}

export default SendNftModal