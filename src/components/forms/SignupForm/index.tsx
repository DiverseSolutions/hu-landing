import { EMAIL_REGEX, PASSWORD_MIN_ERROR, PASSWORD_MIN_REGEX } from '@/lib/consts';
import { useSignupMutation } from '@/store/rtk-query/cognito/cognito-api';
import classNames from 'classnames';
import React from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

type Props = {
  onSuccess: (d: SignupFormData) => void;
}

type SignupFormData = {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export default function SignupForm({ ...props }: Props) {

  const [callSignup, { data: signupResp, isLoading: isSignupLoading, }] = useSignupMutation()

  const { register, handleSubmit, watch, formState: {
    errors
  } } = useForm<SignupFormData>({
    defaultValues: {
      username: '',
      password: '',
      password2: '',
      email: '',
    }
  })

  const password = watch('password')

  const onSubmit = async (d: SignupFormData) => {
    try {
      const resp = await callSignup({
        Username: d.username,
        Password: d.password,
        UserAttributes: [
          {
            Name: "email",
            Value: d.email,
          },
          {
            Name: "nickname",
            Value: d.username,
          },
        ]
      }).unwrap()
      if (resp.UserSub) {
        toast("Request successful. Please check your email", {
          type: 'success'
        })
        props.onSuccess(d)
      }
    } catch (e: any) {
      if (e.data?.message === 'PreSignUp failed with error Email address exists and UNCONFIRMED.') {
        toast("OTP aleady sent. Please check your email.")
        props.onSuccess(d);
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div className="w-full form-control">
            <label className="label">
              <span className="label-text">Username</span>
              <span className="label-text-alt">This will be used for login</span>
            </label>
            <input type="text" placeholder="Type here" className="w-full input input-bordered" {...register('username', {
              required: true,
              validate: (v) => v?.length < 4 ? 'Minimum length 4' : undefined
            })} />
            <label className="label">
              <span className="label-text-alt text-error">{errors.username?.message}</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <div className="w-full form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="text" placeholder="Type here" className="w-full input input-bordered"
              {...register('email', {
                required: true,
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Invalid email"
                }
              })} />
            <label className="label">
              <span className="label-text-alt text-error">{errors.email?.message}</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <div className="w-full form-control">
            <label className="label">
              <span className="label-text">Password</span>
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
              <span className="label-text">Confirm password</span>
            </label>
            <input type="password" placeholder="Type here" className="w-full input input-bordered"
              {...register('password2', {
                validate: (v) => v === password ? undefined : 'Password does not match'
              })} />
            <label className="label">
              <span className="label-text-alt text-error">{errors.password2?.message}</span>
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between mt-8">
          <button className={classNames("w-full btn btn-primary", { 'loading': isSignupLoading })} type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </>
  )
}