import { EMAIL_REGEX } from '@/lib/consts'
import { useOtpSendEmailMutation } from '@/store/rtk-query/ard-art/ard-art-api'
import classNames from 'classnames'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    onSubmit: (v: { email: string, otpId: number }) => void
}

type SendNftEmailFormData = {
    email: string;
}

function SendNftEmailForm({ ...props }: Props) {

    const [callOtpSendEmail, { isLoading: isSendOtpLoading }] = useOtpSendEmailMutation()

    const { handleSubmit, register, formState: {
        errors
    } } = useForm<SendNftEmailFormData>({
        defaultValues: {
            email: ``
        }
    })

    const onSubmit = async (d: SendNftEmailFormData) => {
        const r = await callOtpSendEmail({
            actionType: 'third_party_access'
        }).unwrap()
        if (r.result?.id) {
            props.onSubmit({
                email: d.email,
                otpId: r.result.id
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className='text-sm'>Receiver email address</label>
            <input {...register('email', {
                pattern: {
                    value: EMAIL_REGEX,
                    message: "Invalid email"
                }
            })} className="w-full mt-2 input input-bordered" />
            {errors.email ? (
                <label className="label">
                    <span className="label-text-alt text-error">{errors.email?.message}</span>
                </label>) : <></>}
            <div className="mt-6">
                <button type="submit" className={classNames("w-full btn btn-black", { 'loading': isSendOtpLoading })}>Send NFT</button>
            </div>
        </form>
    )
}

export default SendNftEmailForm