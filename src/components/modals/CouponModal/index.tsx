import { ArdArtCheckCouponResult, ArdArtMyOwnedNftRecord } from '@/store/rtk-query/hux-ard-art/types'
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
import CouponForm from './components/CouponForm'
import { useRouter } from 'next/router'

type Props = {
}

type CouponFormType = 'code' | 'result'

function CouponModal({ }: Props) {

    const [formType, setFormType] = useState<CouponFormType>('code')
    const couponModalRef = useRef<HTMLInputElement>(null)
    const [couponCode, setCouponCode] = useState<string>()

    const [isSuccess, setIsSuccess] = useState(false)
    const { data: usdArdx, isLoading: isRateLoading } = useUsdToArdxRateQuery()

    const [coupon, setCoupon] = useState<ArdArtCheckCouponResult>()

    const router = useRouter()

    const handleClose = () => {
        if (couponModalRef.current?.checked) {
            couponModalRef.current.click()
            setIsSuccess(false)
            setFormType('code')
        }
    }

    return (
        <>
            <input ref={couponModalRef} type="checkbox" id="coupon-modal" className="modal-toggle" />
            <div className="modal backdrop-blur-[7.5px] bg-black bg-opacity-[0.4]" onClick={handleClose}>
                <div className="modal-box p-6 md:max-w-[400px] rounded-xl" onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <div className="flex">
                        <div className='p-3 bg-black flex justify-center items-center w-[44px] h-[44px] bg-opacity-[0.04] cursor-pointer rounded-xl' onClick={handleClose}>
                            <SendNftCloseSvg />
                        </div>
                    </div>
                    <div className="mt-6">
                        {!isSuccess ? (
                            <div>
                                <p className='font-bold text-[#272937] text-[24px]'>Enter the coupon code</p>
                                <p className="mt-2 text-black text-opacity-[0.65] text-sm">Enter the correct Coupon code on the Gift Card.</p>
                            </div>
                        ) : (<></>)}
                        {isSuccess ? (
                            <div>
                                <p className='font-bold text-[#5DD200] text-[24px]'>Successfully!</p>
                                <p className="mt-2">Your Coupon code has been successfully activated.</p>
                            </div>
                        ) : (<></>)}
                    </div>

                    <div className="mt-6">
                        {formType === 'code' ? (
                            <CouponForm onSuccess={(v) => {
                                setCoupon(v.coupon)
                                setCouponCode(v.code)
                                setFormType('result')
                                setIsSuccess(true)
                            }} />
                        ) : (<></>)}
                        {coupon && formType === 'result' ? (
                            <div className="mt-6 space-y-2">
                                {coupon.records.map((item) => (
                                    <div key={item.id} onClick={() => {
                                        handleClose()
                                        router.push(`/bundle?id=${item.id}&coupon=${couponCode}`)
                                    }} className="flex cursor-pointer items-start rounded-xl border p-2 border-black border-opacity-[0.1]">
                                        <img src={item.imageUrl} className="w-[72px] h-auto object-cover rounded-lg" />
                                        <div className="flex flex-col ml-4">
                                            <p className='text-opacity-[0.65] text-black text-xs font-light'>Powered by Ard & Metaforce</p>
                                            <p className='text-base font-light text-black text-opacity-[0.93]'>{item.name}</p>
                                            <div className="mt-2">
                                                <span className="text-base font-bold">${formatPrice(item.price)}</span>
                                                {!usdArdx ? (<ClipLoader size={12} />) : (
                                                    <span className="ml-[6px] text-xs py-1 px-2 font-light bg-black bg-opacity-[0.04] rounded-sm">
                                                        {formatPrice(item.price * usdArdx)} ARDX
                                                    </span>)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-6">
                                    <button onClick={handleClose} className="w-full text-base btn btn-black rounded-xl">Close</button>
                                </div>
                            </div>
                        ) : (<></>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CouponModal