import { useForgotPasswordMutation } from '@/store/rtk-query/cognito/cognito-api';
import classNames from 'classnames';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

type Props = {
    onSuccess: (v: string) => void;
}

type ForgotPasswordFormData = {
    username: string;
}

export default function ForgotPasswordForm({ ...props }: Props) {

    const [callForgotPassword, { isLoading: isForgotPasswordLoading }] = useForgotPasswordMutation()

    const { register, handleSubmit } = useForm<ForgotPasswordFormData>({
        defaultValues: {
            username: '',
        }
    })

    const onSubmit = async (d: ForgotPasswordFormData) => {
        const r = await callForgotPassword({
            Username: d.username
        }).unwrap()
        toast('Confirmation code sent successfully. Please check your email.', {
            type: 'success'
        })
        props.onSuccess(d.username)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">Username</span>
                    </label>
                    <input type="text" placeholder="Enter your username" className="w-full input input-bordered" {...register('username')} />
                    {/* <label className="label">
            <span className="label-text-alt">This will be used for login</span>
          </label> */}
                </div>
            </div>
            <div className="flex items-center justify-between mt-8">
                <button className={classNames('w-full btn btn-primary', { 'loading': isForgotPasswordLoading })} type="submit">
                    Get confirmation code
                </button>
            </div>
        </form>
    )
}