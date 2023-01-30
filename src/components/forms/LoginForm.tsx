import { PASSWORD_MIN_REGEX } from '@/lib/consts';
import { useMetalandLoginMutation } from '@/store/rtk-query/ard-art/ard-art-api';
import { useLoginMutation } from '@/store/rtk-query/cognito/cognito-api';
import classNames from 'classnames';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

type Props = {
  onSuccess: () => void;
}

type LoginFormData = {
  username: string;
  password: string;
}
export default function LoginForm({ ...props }: Props) {

  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [callMetalandLogin, { isLoading: isMetalandLoginLoading }] = useMetalandLoginMutation()
  const [callLogin, { isLoading: isCognitoLoginLoading }] = useLoginMutation()

  const { register, handleSubmit, formState: {
    errors
  } } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
    }
  })

  const handleLogin = async (d: LoginFormData) => {
    const cognitoResp = await callLogin({
      AuthParameters: {
        USERNAME: d.username,
        PASSWORD: d.password
      }
    }).unwrap();
    const metalandResp = await callMetalandLogin({
      token: cognitoResp.AuthenticationResult.AccessToken,
    }).unwrap()
    if (metalandResp.status === 'success') {
      console.log(`metaland resp:`)
      console.log(metalandResp)
      toast('Logged In Successfully.', {
        type: 'success'
      })
      props.onSuccess()
    }
  }

  const onSubmit = async (d: LoginFormData) => {
    setIsLoginLoading(true);
    try {
      await handleLogin(d);
    } catch (e) {
      console.log(e)
    }
    setIsLoginLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <div className="w-full form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" placeholder="Enter your username" className="w-full input input-bordered"
            {...register('username', {
              validate: (v) => v?.length < 4 ? "Invalid username" : undefined
            })} />
          <label className="label">
            <span className="label-text-alt text-error-content">{errors.username?.message}</span>
          </label>
        </div>
      </div>
      <div className="mb-4">
        <div className="w-full form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="Enter password" className="w-full input input-bordered"
            {...register('password', {
              pattern: {
                value: PASSWORD_MIN_REGEX,
                message: "Invalid password"
              }
            })} />
          <label className="label">
            <span className="label-text-alt text-error-content">{errors.password?.message}</span>
          </label>
        </div>
      </div>
      <div className="flex items-center justify-between mt-8">
        <button className={classNames('w-full btn btn-primary', { 'loading': isLoginLoading })} type="submit">
          Login
        </button>
      </div>
    </form>
  )
}