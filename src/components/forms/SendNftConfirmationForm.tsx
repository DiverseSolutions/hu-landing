import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { showAuthModal } from '@/store/reducer/auth-reducer/actions'
import { useSendNftMutation } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api'
import classNames from 'classnames'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    onSuccess: () => void;
    otpId: number;
    productId: number;
    email: string;
}

type SendNftConfirmationFormData = {
    otp: string;
}

function SendNftConfirmationForm({ ...props }: Props) {

    const accountId = useAppSelector(state => state.auth.ardArt.accountId)
    const email = useAppSelector(state => state.auth.profile?.email)
    const dispatch = useAppDispatch()
    const [callSendNft, { isLoading: isSendNftLoading }] = useSendNftMutation()

    const { handleSubmit, register, formState: {
        errors
    } } = useForm<SendNftConfirmationFormData>({
        defaultValues: {
            otp: ``
        }
    })

    const onSubmit = async (d: SendNftConfirmationFormData) => {
        if (!accountId || !email) {
            dispatch(showAuthModal({
                type: 'login'
            }))
            return
        }
        const r = await callSendNft({
            otpId: props.otpId.toString(),
            otpCode: d.otp,
            accountId,
            receiverEmail: props.email,
            email: email,
            productId: props.productId,
            amount: 1,
        }).unwrap()
        if (r.result) {
            props.onSuccess()
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className='text-sm'>OTP Code</label>
            <input {...register('otp', {
                validate: (v) => v?.length ? undefined : "Invalid OTP"

            })} className="w-full mt-2 input input-bordered" />
            <label className="mb-2 label">
                <span className="label-text-alt text-error">{errors.otp?.message}</span>
            </label>
            <label className='text-sm'>NFT Receiver</label>
            <input value={props.email} className="w-full mt-2 input input-bordered" readOnly />
            <div className="mt-6">
                <button type="submit" className={classNames("w-full btn btn-black", { 'loading': isSendNftLoading })}>Confirm & Send</button>
            </div>
        </form>
    )
}

export default SendNftConfirmationForm