import { EMAIL_REGEX } from '@/lib/consts'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    onSubmit: (v: { email: string }) => void
}

type SendNftEmailFormData = {
    email: string;
}

function SendNftEmailForm({ ...props }: Props) {

    const { handleSubmit, register, formState: {
        errors
    } } = useForm<SendNftEmailFormData>({
        defaultValues: {
            email: ``
        }
    })

    const onSubmit = (d: SendNftEmailFormData) => {

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className='text-sm'>Email</label>
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
                <button type="submit" className="w-full btn btn-black">Confirm & Send</button>
            </div>
        </form>
    )
}

export default SendNftEmailForm