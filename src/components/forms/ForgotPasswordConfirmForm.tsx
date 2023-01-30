import { useConfirmForgotPasswordMutation } from '@/store/rtk-query/cognito/cognito-api';
import classNames from 'classnames';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

type Props = {
    onSuccess: () => void;
    username: string;
}

type ForgotPasswordConfirmFormData = {
    username: string,
    code: string;
    password: string;
    password2: string;
}

export default function ForgotPasswordConfirmForm({ ...props }: Props) {

    const [callConfirmForgotPassword, { isLoading: isConfirmForgotLoading }] = useConfirmForgotPasswordMutation()

    const { register, handleSubmit } = useForm<ForgotPasswordConfirmFormData>({
        defaultValues: {
            username: props.username,
            code: '',
            password: '',
            password2: '',
        }
    })

    const onSubmit = async (d: ForgotPasswordConfirmFormData) => {
        const r = await callConfirmForgotPassword({
            ConfirmationCode: d.code,
            Username: props.username,
            Password: d.password
        }).unwrap()
        toast('Password reset successfully.', {
            type: 'success'
        })
        props.onSuccess()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">Confirmation code</span>
                    </label>
                    <input type="text" placeholder="Type here" className="w-full input input-bordered" {...register('code')} />
                    {/* <label className="label">
            <span className="label-text-alt">This will be used for login</span>
          </label> */}
                </div>
            </div>
            <div className="mb-4">
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">New password</span>
                    </label>
                    <input type="password" placeholder="Type here" className="w-full input input-bordered" {...register('password')} />
                    {/* <label className="label">
            <span className="label-text-alt">This will be used for login</span>
          </label> */}
                </div>
            </div>
            <div className="mb-4">
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">Confirm New password</span>
                    </label>
                    <input type="password" placeholder="Type here" className="w-full input input-bordered" {...register('password2')} />
                    {/* <label className="label">
            <span className="label-text-alt">This will be used for login</span>
          </label> */}
                </div>
            </div>
            <div className="flex items-center justify-between mt-8">
                <button className={classNames('w-full btn btn-primary', { 'loading': isConfirmForgotLoading })} type="submit">
                    Reset Password
                </button>
            </div>
        </form>
    )
}