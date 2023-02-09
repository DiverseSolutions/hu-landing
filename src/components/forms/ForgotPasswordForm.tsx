import { useForgotPasswordMutation } from '@/store/rtk-query/cognito/cognito-api';
import classNames from 'classnames';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { EMAIL_REGEX } from '@/lib/consts';
import { useLazyCognitoUserQuery } from '@/store/rtk-query/hux-ard-art/hux-ard-art-api';


type Props = {
    onSuccess: (v: string) => void;
}

type ForgotPasswordFormData = {
    email: string;
}

export default function ForgotPasswordForm({ ...props }: Props) {

    const [callCognitoUserData] = useLazyCognitoUserQuery()
    const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false)
    const [callForgotPassword, { }] = useForgotPasswordMutation()

    const { register, handleSubmit, formState: {
        errors
    } } = useForm<ForgotPasswordFormData>({
        defaultValues: {
            email: '',
        }
    })

    const onSubmit = async (d: ForgotPasswordFormData) => {
        setIsForgotPasswordLoading(true)
        try {
            const userDataResp = await callCognitoUserData({
                email: d.email,
            }).unwrap()
            if (!userDataResp.result) {
                return;
            }
            if (!userDataResp.result.Response.Users.length) {
                toast("User not found", {
                    type: 'error'
                })
                return;
            }
            const cognitoUserData = userDataResp.result.Response.Users[0];
            const r = await callForgotPassword({
                Username: cognitoUserData.Username
            }).unwrap()
            toast('Confirmation code sent successfully. Please check your email.', {
                type: 'success'
            })
            props.onSuccess(cognitoUserData.Username)
        } finally {
            setIsForgotPasswordLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" placeholder="" className="w-full input input-bordered"
                        {...register('email', {
                            pattern: {
                                value: EMAIL_REGEX,
                                message: "Invalid Email"
                            },
                        })} />
                    <label className="label">
                        <span className="label-text-alt text-error-content">{errors.email?.message}</span>
                    </label>
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