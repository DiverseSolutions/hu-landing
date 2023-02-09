import { PASSWORD_MIN_ERROR, PASSWORD_MIN_REGEX } from '@/lib/consts';
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

    const { register, handleSubmit, watch, formState: {
        errors
    } } = useForm<ForgotPasswordConfirmFormData>({
        defaultValues: {
            username: props.username,
            code: '',
            password: '',
            password2: '',
        }
    })

    const password = watch('password')

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
                    <input type="text" placeholder="Type here" className="w-full input input-bordered"
                        {...register('code', {
                            required: true,
                            validate: (v) => v.match(/^[0-9]{6}/) ? undefined : "Invalid code"
                        })} />
                    <label className="label">
                        <span className="label-text-alt text-error">{errors.code?.message}</span>
                    </label>
                </div>
            </div>
            <div className="mb-4">
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">New password</span>
                    </label>
                    <input type="password" placeholder="Type here" className="w-full input input-bordered"
                        {...register('password', {
                            pattern: {
                                value: PASSWORD_MIN_REGEX,
                                message: PASSWORD_MIN_ERROR
                            }
                        })} />
                    <label className="label">
                        <span className="label-text-alt text-error">{errors.password?.message}</span>
                    </label>
                </div>
            </div>
            <div className="mb-4">
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">Confirm New password</span>
                    </label>
                    <input type="password" placeholder="Type here" className="w-full input input-bordered"
                        {...register('password2', {
                            validate: (v) => v === password ? undefined : "Password does not match"
                        })} />
                    <label className="label">
                        <span className="label-text-alt text-error">{errors.password2?.message}</span>
                    </label>
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