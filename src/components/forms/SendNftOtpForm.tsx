import { EMAIL_REGEX } from '@/lib/consts'
import { useAppSelector } from '@/store/hooks'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    onSubmit: (v: { otp: string }) => void
}

type SendNftOtpFormData = {
    otp: string;
}

function SendNftOtpForm({ ...props }: Props) {

    const email = useAppSelector(state => state.auth.profile?.email)

    const { handleSubmit, register, formState: {
        errors
    } } = useForm<SendNftOtpFormData>({
        defaultValues: {
            otp: ``
        }
    })

    const onSubmit = (d: SendNftOtpFormData) => {

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {email ? <label className="label">
                <span className="label-text">We sent OTP confirmation code to your {email} email.</span>
            </label> : <></>}
            <label className='text-sm'>OTP</label>
            <input {...register('otp', {
                validate: (v) => v?.length ? undefined : "Invalid OTP"
            })} className="w-full mt-2 input input-bordered" />
            {errors.otp ? (
                <label className="label">
                    <span className="label-text-alt text-error">{errors.otp?.message}</span>
                </label>) : <></>}
            <div className="mt-6">
                <button type="submit" className="w-full btn btn-black">Confirm & Send</button>
            </div>
        </form>
    )
}

export default SendNftOtpForm