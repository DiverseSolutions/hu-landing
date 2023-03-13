import { ArdArtMyOwnedNftRecord } from '@/store/rtk-query/hux-ard-art/types'
import { GrClose } from 'react-icons/gr'
import React, { useRef, useState } from 'react'
import { formatPrice } from '@/lib/utils'
import { useArdxUsdRateQuery, useUsdToArdxRateQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import { ClipLoader } from 'react-spinners'
import SendNftEmailForm from '@/components/forms/SendNftEmailForm'
import SendNftConfirmationForm from '@/components/forms/SendNftConfirmationForm'
import { toast } from 'react-toastify'
import SendNftCloseSvg from '@/assets/svg/send-nft-close.svg'
import SendNftWarning from './components/SendNftWarning'

type Props = {
    nft: ArdArtMyOwnedNftRecord | undefined,
    onClose: () => void
    onSuccess: () => void
}

type SendNftFormType = 'email' | 'otp-confirm'

function SendNftModal({ onClose, nft, onSuccess }: Props) {

    const [formType, setFormType] = useState<SendNftFormType>('email')
    const sendNftModalRef = useRef<HTMLInputElement>(null)

    const [isSuccess, setIsSuccess] = useState(false)
    const { data: usdArdx, isLoading: isRateLoading } = useUsdToArdxRateQuery()

    const [otpId, setOtpId] = useState<number>()
    const [email, setEmail] = useState<string>()

    const handleClose = () => {
        if (sendNftModalRef.current?.checked) {
            sendNftModalRef.current.click()
            setIsSuccess(false)
            setFormType('email')
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
                <div className="modal-box p-6 md:max-w-[400px] rounded-xl" onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <div className="flex">
                        <div className='p-3 bg-black flex justify-center items-center w-[44px] h-[44px] bg-opacity-[0.04] cursor-pointer rounded-xl' onClick={handleClose}>
                            <SendNftCloseSvg />
                        </div>
                    </div>
                    <div className="mt-6">
                        {!isSuccess ? (<p className='font-bold text-[#272937] text-[24px]'>Transfer NFT</p>) : (<></>)}
                        {isSuccess ? (
                            <div>
                                <p className='font-bold text-[#5DD200] text-[24px]'>Transferred Successfully!</p>
                                <p className="mt-2">You have successfully transfered to {email}</p>
                            </div>
                        ) : (<></>)}
                    </div>
                    <div className="mt-6">
                        <div className="flex items-start rounded-xl border p-2 border-black border-opacity-[0.1]">
                            <img src={nft.imageUrl} className="w-[72px] h-auto object-cover rounded-lg" />
                            <div className="flex flex-col ml-4">
                                <p className='text-opacity-[0.65] text-black text-xs font-light'>Powered by Ard & Metaforce</p>
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
                    {!isSuccess ? (
                        <div className="mt-6">
                            <SendNftWarning />
                        </div>
                    ) : (<></>)}
                    <div className="mt-6">
                        {!isSuccess && formType === 'email' ? (
                            <SendNftEmailForm onSubmit={(v) => {
                                setEmail(v.email)
                                setOtpId(v.otpId)
                                setFormType('otp-confirm')
                            }} />
                        ) : (<></>)}
                        {!isSuccess && formType === 'otp-confirm' && otpId && email ? (
                            <SendNftConfirmationForm productId={nft.id} otpId={otpId} email={email} onSuccess={() => {
                                setIsSuccess(true)
                                onSuccess()
                            }} />
                        ) : (<></>)}
                        {isSuccess ? (
                            <div className="mt-6">
                                <button onClick={handleClose} className="w-full text-base btn btn-black rounded-xl">Close</button>
                            </div>
                        ) : (<></>)}
                    </div>
                </div>
            </div>) : <></>
            }
        </>
    )
}

export default SendNftModal