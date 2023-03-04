import { useSignupConfirmMutation, useSignupResendMutation } from '@/store/rtk-query/cognito/cognito-api';
import classNames from 'classnames';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
    username: string;
    onSuccess: () => void;
}

type SignupOtpFormData = {
    otp: string;
}

export default function SignupOtpForm({ username, ...props }: Props) {

    const [callSignupResend, { isLoading: isSignupResendLoading }] = useSignupResendMutation()
    const [callSignupConfirm, { isLoading: isSignupConfirmLoading }] = useSignupConfirmMutation()

    const { handleSubmit, register } = useForm<SignupOtpFormData>({
        defaultValues: {
            otp: ''
        }
    })

    const onResend = async () => {
        await callSignupResend({
            Username: username
        }).unwrap();
        toast('Code resent successfully. Please check your email.', {
            type: "success"
        })
    }

    const onSubmit = async (d: SignupOtpFormData) => {
        await callSignupConfirm({
            Username: username,
            ConfirmationCode: d.otp
        }).unwrap()
        toast('Account created successfully.', {
            type: 'success'
        })
        props.onSuccess();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">Confirmation Code</span>
                    </label>
                    <div className="flex items-center w-full">
                        <input type="text" placeholder="Type here" className="w-full input input-bordered" {...register('otp')} />
                    </div>
                    <label className="label">
                        <span className="label-text-alt">Code that sent to your email</span>
                        <span onClick={onResend} className={classNames('btn btn-xs text-white label-text-alt', { 'loading': isSignupResendLoading })}>Resend</span>
                    </label>
                </div>
            </div>
            <div className="flex items-center justify-between mt-8">
                <button className={classNames("w-full btn btn-primary", { 'loading': isSignupConfirmLoading })}>
                    Confirm Registration
                </button>
            </div>
        </form>
    )
}